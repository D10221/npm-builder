import { NpmPackage } from "./npm-package";
export type Package = NpmPackage & {
    /**
     * Added here
     */
    path?: string ;
};
