import Icon, { IconName, IconSize } from "./Icon";

const SpecialSizes = {
  Globe: "14" as IconSize,
} as const;

export type SpecialSizes = keyof typeof SpecialSizes;

interface IIconSquare {
  name: IconName;
}

function size(name: IconName): IconSize {
  const defaultSize: IconSize = "16";
  const isSpecialSize = name in SpecialSizes;
  return isSpecialSize ? SpecialSizes[name as SpecialSizes] : defaultSize;
}

export default function IconSquare({ name }: IIconSquare): JSX.Element {
  return (
    <div className="border-inset rounded mr-3.5 w-7.5 h-7.5 flex justify-center items-center text-dark">
      <Icon size={size(name)} name={name}></Icon>
    </div>
  );
}

IconSquare.defaultProps = {
  name: "Cube",
};
