import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import * as HugeIcons from "@hugeicons/core-free-icons";

export type IconProps = Omit<React.ComponentProps<typeof HugeiconsIcon>, "icon">;

export const Menu = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.Menu01Icon} {...props} />;
export const X = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.Cancel01Icon} {...props} />;
export const ArrowUpRight = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.ArrowUpRight01Icon} {...props} />;
export const CheckCircle2 = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.Tick01Icon} {...props} />;
export const ArrowRight = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.ArrowRight01Icon} {...props} />;
export const CheckCircle = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.Tick01Icon} {...props} />;
export const Search = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.Search01Icon} {...props} />;
export const ChevronDown = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.ArrowDown01Icon} {...props} />;
export const HelpCircle = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.QuestionIcon} {...props} />;
export const Zap = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.FlashIcon} {...props} />;
export const Sparkles = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.SparklesIcon} {...props} />;
export const MessageCircle = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.Comment01Icon} {...props} />;
export const ShieldCheck = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.ShieldIcon} {...props} />;
export const Send = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.SentIcon} {...props} />;
export const Check = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.Tick01Icon} {...props} />;
export const LogIn = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.Login01Icon} {...props} />;
export const Users = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.UserMultipleIcon} {...props} />;
export const Info = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.InformationCircleIcon} {...props} />;
export const Shield = (props: IconProps) => <HugeiconsIcon icon={HugeIcons.Shield01Icon || HugeIcons.ShieldIcon} {...props} />;
