export const Condition = (action = {}) => {
    const { actionType, error = { title: 'Error Message', message: 'Invalid Action' } } = action;
    if (/start/gi.test(actionType)) {
        return { isLoading: true, isSuccess: false, error: {} };
    } else if (/fail/gi.test(actionType)) {
        return { isLoading: false, isSuccess: false, error };
    } else {
        return { isLoading: false, isSuccess: true, error: {} };
    }
};

export const dispatchAction = (dispatch, promsie, actionType = 'Action') => async (data) => {
    try {
        dispatch({ actionType: actionType + '_Start' });
        const payload = await promsie(data);
        dispatch({ actionType, payload });
        return { ...data, ...payload };
    } catch (error) {
        dispatch({ actionType: actionType + '_Fail' });
        throw error;
    }
};
