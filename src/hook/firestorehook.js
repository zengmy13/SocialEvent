import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {aynscserror, aynscsfinish, aynscstart} from "../store/asyn/actioncreators";
import {dealwithdata} from "../firebase/fromfirebase";

export function Usedocshook(props) {
    const dispatch = useDispatch();
    const {deps, data, query, shouldExecute = true} = props;

    useEffect(() => {
        if (shouldExecute === false) {
            return;
        }
        dispatch(aynscstart());
        query.onSnapshot(snapshot => {
            const docs = snapshot.docs.map(item => dealwithdata(item))
            data(docs);
            dispatch(aynscsfinish())
        }, error => dispatch(aynscserror(error)));
    }, deps)
}

export function Usesingaldochook(props) {
    const dispatch = useDispatch();
    const {deps, data, query, shouldExecute = true} = props;
    useEffect(() => {
        if (shouldExecute == false) {
            return;
        }
        dispatch(aynscstart());
        query.onSnapshot(snapshot => {
            data(dealwithdata(snapshot))
            dispatch(aynscsfinish())
        }, error => dispatch(aynscserror(error)));
    }, deps)
}

