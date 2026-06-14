export const Schema = z.object({
  玩家: z.object({
    姓名: z.string().prefault(''),
    国籍: z.string().prefault(''),
    年龄: z.coerce.number().prefault(0),
    位置: z.string().prefault(''),
    稳定性: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(70),
    硬实力: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(70),
    大赛经验: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(30),
    当前战队: z.string().prefault(''),
    当前赛事rating: z.coerce.number().prefault(0),
    职业生涯: z.object({
      Major冠军数: z.coerce.number().prefault(0),
      大赛冠军数: z.coerce.number().prefault(0),
      MVP数: z.coerce.number().prefault(0),
      HLTV_Top20入选次数: z.coerce.number().prefault(0),
    }).prefault({}),
  }).prefault({}),

  赛季: z.object({
    当前日期: z.string().prefault('2023-10-01'),
    当前赛事: z.string().prefault(''),
    赛事阶段: z.enum(['休赛期', '训练期', '小组赛', '淘汰赛', '决赛', '赛后']).prefault('休赛期'),
    赛前状态: z.enum(['LifeGame爆发', '正常发挥', '发挥失常']).prefault('正常发挥'),
  }).prefault({}),

  战队: z.object({
    化学反应: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(50),
    世界排名: z.coerce.number().prefault(20),
    近期战绩: z.string().prefault(''),
    阵容: z.intersection(
      z.object({
        教练: z.object({
          姓名: z.string().prefault(''),
          风格: z.string().prefault(''),
        }).prefault({}),
      }),
      z.record(z.string().describe('选手名'), z.object({
        姓名: z.string().prefault(''),
        稳定性: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(70),
        硬实力: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(70),
        大赛经验: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(50),
        与玩家关系: z.string().prefault('队友'),
      }).prefault({}))
    ).prefault({}),
  }).prefault({}),

  生态: z.object({
    转会市场动态: z.string().prefault(''),
    社区舆论风向: z.string().prefault(''),
    近期重大事件: z.string().prefault(''),
  }).prefault({}),
}).prefault({});

export type Schema = z.output<typeof Schema>;
