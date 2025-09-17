export interface IRes<TData = any, TError = any> {
    data?: TData
    error?: TError
}