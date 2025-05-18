type CurrentUserProps = {
  displayName: string;
};

export function CurrentUser({ displayName }: CurrentUserProps) {
  return (
    <div className="grid place-items-center">
      <span className="text-xs italic tracking-wider">Bienvenido</span>
      <span className="text-xs">{displayName}</span>
    </div>
  );
}
