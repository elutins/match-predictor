export type Ok<T> = {
    isOk: true
    data: T
}

export type Err<E> = {
    isOk: false
    reason: E
}

export type Result<T, E> = (Ok<T> | Err<E>)



const ok = <T, E>(data: T): Result<T, E> => ({
    isOk: true,
    data,
});

const err = <T, E>(reason: E): Result<T, E> => ({
    isOk: false,
    reason,
});

export const result = {
    ok,
    err
};
