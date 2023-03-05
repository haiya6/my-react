export const NoFlags = 0b000000000000000000000000000
export const Placement = 0b000000000000000000000000010
export const Update = 0b000000000000000000000000100
export const Hydrating = 0b000000000000001000000000000
export const ChildDeletion = 0b000000000000000000000010000
export const ContentReset = 0b000000000000000000000100000
export const Ref = 0b000000000000000001000000000
export const Visibility = 0b000000000000010000000000000

export const MutationMask =
  Placement | Update | ChildDeletion | ContentReset | Ref | Hydrating | Visibility
