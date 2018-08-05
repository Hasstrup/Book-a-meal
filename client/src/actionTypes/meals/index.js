/**
 * @name AllMealsFetchedForUser
 * @description Action creator that returns the meals belonging to the current user
 * @param {object} payload the meals belonging to the current user
 * @returns {object} the action to be reduced
 */
export const AllMealsFetchedForUser = (payload) => ({
    type: 'ALL_MEALS_FETCHED_FOR_USER',
    payload
});