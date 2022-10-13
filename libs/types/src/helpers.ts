export type FindByTag<Union, Tag> = Union extends { type: Tag } ? Union : never;
