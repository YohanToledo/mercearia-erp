import { color } from './_colors'

export const themeAntd = {
  colorPrimary: color.primary,
  gray: {
    100: '#d9d9d9',
    200: '#878686',
  },
  components: {
    Layout: {
      bodyBg: color.bodyGray,
      siderBg: color.secondary,
      headerBg: color.white,
    },
    Button: {
      colorPrimary: color.secondary,
      colorPrimaryBgHover: color.secondary,
      colorPrimaryHover: color.secondary,
    },
    Checkbox: {
      colorPrimary: color.secondary,
      colorPrimaryHover: color.secondary,
    },
    Switch: {
      colorPrimary: color.secondary,
      colorPrimaryHover: color.secondary,
    },
    Steps: {
      colorPrimary: color.secondary,
    },
    Pagination: {
      colorPrimary: color.secondary,
      colorPrimaryHover: color.secondary,
    },
    Spin: {
      colorPrimary: color.secondary,
    },
  },
}
