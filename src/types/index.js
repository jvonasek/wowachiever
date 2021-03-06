// @flow
/* eslint-disable no-use-before-define */
import type { Store as ReduxStore } from 'redux';

import type { CharacterState } from '../reducers/character';
import type { EntityState } from '../reducers/entities';
import type { UiState } from '../reducers/ui';
import type { RequestsState } from '../reducers/requests';

export type Id = number;
export type Timestamp = number;

export type State = {
  +character: CharacterState,
  +entities: EntityState,
  +ui: UiState,
  +requests: RequestsState,
  +routing: Object,
  +search: Object,
};

// TODO specify actions more
export type Action = {
  type: string,
  payload?: any,
  meta?: any,
  error?: boolean,
};

export type Store = ReduxStore<State, Action>;

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

export type AbstractCategory = {
  +id: Id,
  +name: string,
  +url: string,
  +slug: string,
  +isLegacy: boolean,
};

export type Group = {
  +categories: Array<Category>
} & AbstractCategory;

export type Category = {
  +achievements: Array<Achievement>,
  +completedAchievements: Array<Achievement>,
} & AbstractCategory;

export type ControlButton = {
  title: string,
  value: ?any,
}

export type ToggleGroup = {
  title: string,
  value: ?any,
  property: string,
  toggles: Array<ControlButton>,
};

export type Dropdown = {
  title: string,
  value: ?any,
  options: Array<ControlButton>,
};

export type ViewTypes = 'full' | 'compact';

export type FactionId = 0 | 1 | 2;

export type Achievement = {
  +id: Id,
  +title: string,
  +points: number,
  +description: string,
  +reward: string,
  +rewardItems: Array<Object>,
  +icon: string,
  +criteria: Array<Criterion>,
  +accountWide: boolean,
  +factionId: FactionId,
  +parent: Id,
  +isLegacy: boolean,
  +hasReward: boolean,
  +timestamp: Timestamp,
  +completed: boolean,
  +visibleCriteria: Array<Criterion>,
  +progress: number,
};

export type Criterion = {
  +id: Id,
  +description: string,
  +orderIndex: number,
  +max: number,
  +quantity: number,
  +timestamp: Timestamp,
  +created: Timestamp,
  +assetId?: Id,
  +asset?: Achievement,
  +format?: string,
  +type?: number,
  +progressBar?: boolean,
  +progress?: number,
};

export type SearchResult = {
  +id: Id,
  +title: string,
  +icon: string,
  +completed: boolean,
  +url: string,
};

export type Region = 'eu' | 'us';

export type CharFormParams = {
  character: string,
  realm: {
    region: Region,
    value: string,
  },
};

export type BnetApiParams = {
  region: Region,
  realm: string,
  character: string,
};

export type Config = {
  API_KEY: string,
  OVERVIEW_RECENT_ACHIEVEMENTS_COUNT: number,
  OVERVIEW_UNFINISHED_ACHIEVEMENTS_COUNT: number,
  SEARCH_RESULTS_LIMIT: number,
  DATE_FORMAT: string,
  REGIONS: { [string]: { locale: Object } },
  LEGACY_GROUPS: Array<Id>,
  RACES: { [string]: string },
  CLASSES: { [string]: string },
  CLASS_COLORS: { [string]: string },
};
