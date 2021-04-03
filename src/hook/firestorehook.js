import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {aynscserror, aynscsfinish, aynscstart} from "../store/asyn/actioncreators";
import {dealWithData} from "../firebase/fromfirebase";

export function UseDocsHook(props) {
    const dispatch = useDispatch();
    const {deps, data, query, shouldexecute = true} = props;

    useEffect(() => {
        if (shouldexecute === false) {
            return;
        }
        dispatch(aynscstart());
        query.onSnapshot(snapshot => {
            const docs = snapshot.docs.map(item => dealWithData(item))
            data(docs);
            dispatch(aynscsfinish())
        }, error => dispatch(aynscserror(error)));
    }, deps)
}

export function UsingAldocHook(props) {
    const dispatch = useDispatch();
    const {deps, data, query, shouldExecute = true} = props;
    useEffect(() => {
        if (shouldExecute === false) {
            return;
        }
        dispatch(aynscstart());
        query.onSnapshot(snapshot => {
            data(dealWithData(snapshot))
            dispatch(aynscsfinish())
        }, error => dispatch(aynscserror(error)));
    }, deps)
}

