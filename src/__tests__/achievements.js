import { entities } from '../../public/data/achievements.json';

const achievement = entities.achievements[11427];

describe('achievements', () => {
  it('achievement should contain correct properties', () => {
    expect(achievement).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      points: expect.any(Number),
      description: expect.any(String),
      reward: expect.any(String),
      rewardItems: expect.any(Array),
      icon: expect.any(String),
      criteria: expect.any(Array),
      accountWide: expect.any(Boolean),
      factionId: expect.any(Number),
      parent: expect.any(Number),
      isLegacy: expect.any(Boolean),
      hasReward: expect.any(Boolean),
      timestamp: expect.any(Number),
      completed: expect.any(Boolean),
      progress: expect.any(Number),
      progressBar: expect.any(Boolean),
      visibleCriteria: expect.any(Array),
    });
  });
});
