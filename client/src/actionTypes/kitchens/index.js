/**
 * @name TargetKitchenRetrieved
 * @description this action creator should be called when a kitchen is 
 * successfully created
 * @param {object} payload - the new kitchen created
 * @returns {object} the main action
 */
const TargetKitchenRetrieved = payload => ({
  type: 'TARGET_KITCHEN_FETCHED',
  payload
});

/** TODO: This is now redundant as users should only have one kitchen
 * @name KitchenBelongsToUser
 * @description this action creator should be called when the kitchen belonging 
 * to the current user is fetched (if any)
 * @param {object} payload - the kitchen received
 * @returns {object} the main action
 */
const KitchenBelongsToUser = payload => ({
  type: 'KITCHEN_BELONGS_TO_USER',
  payload
});

export {
  TargetKitchenRetrieved,
  KitchenBelongsToUser
};
