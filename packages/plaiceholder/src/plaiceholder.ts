import { getBase64 } from "./base64";
import { getBlurhash } from "./blurhash";
import { getCSS } from "./css";
import { getImage, TImage, IGetImageReturn } from "./get";
import { getSVG } from "./svg";

export type TGetPlaiceholderSrc = TImage;
export type TGetPlaiceholderOptions = {};
export interface IGetPlaiceholderReturn extends Pick<IGetImageReturn, "img"> {
  base64: any;
  blurhash: any;
  css: any;
  svg: any;
}

export interface IGetPlaiceholder {
  (
    src: TGetPlaiceholderSrc,
    options?: TGetPlaiceholderOptions
  ): Promise<IGetPlaiceholderReturn>;
}

export const getPlaiceholder: IGetPlaiceholder = async (src, options = {}) => {
  const {
    img,
    optimizedForBase64,
    optimizedForBlurhash,
    optimizedForCSS,
    optimizedForSVG,
  } = await getImage(src);

  return Promise.all([
    getBase64(optimizedForBase64),
    getBlurhash(optimizedForBlurhash),
    getCSS(optimizedForCSS),
    getSVG(optimizedForSVG),
  ]).then((values) => {
    const [base64, blurhash, css, svg] = values;

    return {
      img,
      css,
      base64,
      blurhash,
      svg,
    };
  });
};
