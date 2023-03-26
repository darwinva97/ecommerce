export function nestLayout(
    parent: (page: React.ReactNode) => JSX.Element,
    child: (page: React.ReactNode) => React.ReactElement,
) {
    return (page: React.ReactNode) => parent(child(page));
}