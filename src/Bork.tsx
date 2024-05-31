import { Show, createEffect, createRenderEffect, createResource, createSignal, onMount } from "solid-js";

export default () => {
    const [working, setWorking] = createSignal(0);
    createEffect(() => console.log('createEffect', working()));
    createRenderEffect(() => console.log('createRenderEffect', working()));
    onMount(() => console.log('onMount: ', working()));

    const work: <T>(cb: () => T | Promise<T>) => T | Promise<T> = async (cb) => {
        console.log('pre-inc:', working());
        setWorking(e => { console.log('inc working from', e, 'value', working()); return e + 1 });
        console.log('post-inc:', working());
        try {
            console.log('pre-cb:', working());
            const ret = await cb();
            console.log('post-cb:', working());
            return ret;
        }
        finally {
            console.log('pre-dec: ', working());
            setWorking(e => { console.log('dec work from', e, 'value', working()); return e - 1 });
            console.log('post-dec', working());
        }
    };

    const [res] = createResource(() => work(async () => {
        await Promise.resolve();
    }));

    return (
        <>
            <h1>Working() = {working()}</h1>
            <p>(If you're starting here, the output should be 0. If you go Home, then back again, it should be -1.)</p>
            <Show when={res()}>
                RES:
                {JSON.stringify(res())}
            </Show>
        </>
    );
};