import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@material-ui/core';
import { merge } from 'lodash';

// colors
const primary = '#5294FF';
const premiaBlueDay = 'rgba(82, 148, 255, 0.12)';
const premiaBlueNight = 'rgba(82, 148, 255, 0.2)';
const primaryOnHover = '#80B5FF';

const greySecondaryDay = '#8D97A0';
const greySecondaryNight = '#646464';

const black = '#000000';
const white = '#ffffff';

const textPrimaryDay = '#29343E';
const textSecondaryDay = '#8D97A0';
const textPrimaryNight = '#DCDCDC';
const textSecondaryNight = '#646464';

const callGradientA = '#5294FF';
const callGradientB = '#1EFF78';

const putGradientA = '#EB4A97';
const putGradientB = '#8C43F6';

const hotBadgeGradientA = '#EB7A4A';
const hotBadgeGradientB = '#F643CF';

const backgroundDay = '#F2F4F5';
const backgroundNight = '#000000';

const dividerGreyDay = '#E9E9E9';
const dividerGreyNight = '#212121';

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 8;

function createTheme(
  custom: any,
  options?: ThemeOptions | undefined,
  ...args: object[]
) {
  return createMuiTheme(merge(custom, options), ...args);
}

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: primary,
        dark: premiaBlueDay,
      },
      secondary: {
        main: greySecondaryDay,
      },
      common: {
        black,
        white,
      },
      warning: {
        main: hotBadgeGradientA,
        dark: hotBadgeGradientB,
      },
      text: {
        primary: textPrimaryDay,
        secondary: textSecondaryDay,
      },
      background: {
        default: backgroundDay,
        paper: white,
      },
      success: {
        main: callGradientA,
        dark: callGradientB,
      },
      error: {
        main: putGradientA,
        dark: putGradientB,
      },
      divider: dividerGreyDay,
    },
    typography: {
      htmlFontSize: 16,
      fontFamily: 'DM Sans',
      fontSize: 14,
    },
    overrides: {
      MuiButton: {
        root: {
          boxSizing: 'border-box',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '18px',
          height: '40px',
          borderRadius: 12,
          textTransform: 'none',
          padding: '6px 2.25rem',
          backgroundColor: primary,
          color: white,
          margin: '2px',
          '&:hover': {
            backgroundColor: primaryOnHover,
          },
        },
        sizeSmall: {
          height: '35px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '18px',
        },
        sizeLarge: {
          height: '45px',
          fontSize: '16px',
          fontWeight: 700,
          lineHeight: '18px',
        },
        containedPrimary: {
          background: `linear-gradient(121.21deg, ${callGradientA} 7.78%, ${callGradientB} 118.78%);`,
          color: white,
          '&:hover': {
            background: `linear-gradient(121.21deg, ${callGradientB} 7.78%, ${callGradientA} 118.78%);`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(316.57deg, ${putGradientA} 18.89%, ${putGradientB} 95.84%);`,
          color: white,
          '&:hover': {
            background: `linear-gradient(316.57deg, ${putGradientB} 18.89%, ${putGradientA} 95.84%);`,
          },
        },
        outlinedPrimary: {
          backgroundColor: premiaBlueDay,
          color: primary,
          border: 'none',
          '&:hover': {
            backgroundColor: 'grey',
            border: 'none',
          },
        },
        outlinedSecondary: {
          backgroundColor: white,
            color: textSecondaryDay,
            border: `1px solid ${dividerGreyDay}`,
            '&:hover': {
              backgroundColor: white,
              color: black,
              border: `1px solid ${primaryOnHover}`,
            },
          }
      },
      MuiPaper: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
        rounded: {
          borderRadius: 12,
          border: `1px solid ${dividerGreyDay}`,
        },
      },
      MuiOutlinedInput: {
        root: {
          border: `1px solid ${dividerGreyDay}`,
          borderRadius: 12,
          height: 45,
          paddingLeft: 8,

          '& .MuiSelect-root': {
            paddingLeft: 0,
            alignItems: 'center',
            display: 'flex',

            '& svg': {
              width: 16,
              height: 16,
              marginRight: 8, 

              '& path': {
                fill: primary
              }
            },

            '&:focus': {
              background: 'transparent'
            }
          }
        },
        notchedOutline: {
          border: 'none',
        },
        input: {
          padding: 4,
        },
      },
      MuiTabs: {
        root: {
          height: 55,
          border: 'none',
          padding: '0 8px',
          width: 'auto',
          background: 'white',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.074)',
          borderRadius: 12,

          '& .MuiTabs-indicator': {
            background: primary,
            borderRadius: 1.25,
            boxShadow: '0px 0px 2px rgba(82, 148, 255, 0.514578), 0px 0px 6px rgba(255, 255, 255, 0.538381), 0px 0px 11px #5294FF',
          }
        }
      },
      MuiTab: {
        root: {
          fontSize: 14,
          lineHeight: '18px',
          fontWeight: 'normal',
          minWidth: 'auto !important',
          padding: '0 30px',
          width: 'fit-content',

          '& path': {
            fill: greySecondaryNight,
          },

          '& svg': {
            width: '20px',
            height: '18px',
          },

          '&$selected': {
            borderRadius: 10,

            '& path': {
              fill: primary
            }
          },
        },
        labelIcon: {
          minHeight: '50px',
          paddingTop: 0,
        },
        wrapper: {
          textTransform: 'initial',
          flexDirection: 'row',

          '& svg': {
            marginBottom: '0px !important',
            marginRight: 8
          }
        }
      },
      MuiBottomNavigation: {
        root: {
          background: 'white',
          border: 'none',
          borderRadius: 12,
          padding: 8,
          width: 'fit-content',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.07)',
        },
      },
      MuiBottomNavigationAction: {
        root: {
          fontSize: 14,
          lineHeight: '18px',
          fontWeight: 'normal',
          minWidth: 'auto',

          '& path': {
            fill: greySecondaryNight,
          },

          '& svg': {
            width: '20px',
            height: '18px',
          },

          '&$selected': {
            background: 'rgba(82, 148, 255, 0.12)',
            borderRadius: 10,

            '& path': {
              fill: primary
            }
          },
        },
        wrapper: {
          display: 'flex',
          flexDirection: 'row',
        },
        label: {
          marginLeft: 10,
          fontSize: 14,
          lineHeight: '18px',

          '&$selected': {
            fontWeight: 'bold',
          },
        },
      },
    }
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: primary,
        dark: premiaBlueNight,
      },
      secondary: {
        main: greySecondaryNight,
      },
      common: {
        black,
        white,
      },
      warning: {
        main: hotBadgeGradientA,
        dark: hotBadgeGradientB,
      },
      text: {
        primary: textPrimaryNight,
        secondary: textSecondaryNight,
      },
      background: {
        default: backgroundNight,
        paper: backgroundNight,
      },
      success: {
        main: callGradientA,
        dark: callGradientB,
      },
      error: {
        main: putGradientA,
        dark: putGradientB,
      },
      divider: dividerGreyNight,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
    typography: {
      htmlFontSize: 16,
      fontFamily: 'DM Sans',
      fontSize: 14,
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      subtitle1: {},
      subtitle2: {},
      body1: {},
      body2: {},
    },
    spacing,
    breakpoints: {
      values: {
        xl,
        lg,
        md,
        sm,
        xs,
      },
    },
    overrides: {
      MuiInputBase: {
      },
      MuiInput: {
        underline: {
          '&::before': {
            borderColor: dividerGreyNight,
          },
        },
      },
      MuiInputLabel: {
        root: {},
        shrink: {
          '&.MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(12px, 10px) scale(0.75)',
          },
        },
        outlined: {
          '&.MuiInputLabel-outlined': {
            transform: 'translate(8px, 20px) scale(1)',
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          border: `1px solid ${dividerGreyNight}`,
          borderRadius: 12,
          height: 45,
          paddingLeft: 8,

          '& .MuiSelect-root': {
            paddingLeft: 0,
            alignItems: 'center',
            display: 'flex',

            '& svg': {
              width: 16,
              height: 16,
              marginRight: 8, 

              '& path': {
                fill: primary
              }
            },

            '&:focus': {
              background: 'transparent'
            }
          }
        },
        notchedOutline: {
          border: 'none',
        },
        input: {
          padding: 4,
        },
      },
      MuiFilledInput: {
        root: {},
        underline: {
          '&::after': {
            borderBottom: 'none',
          },
          '&::before': {
            borderBottom: 'none',
          },
          '&:hover::before': {
            borderBottom: 'none',
          },
        },
        input: {},
      },
      MuiSelect: {
        filled: {
          '&:focus': {},
        },
        iconFilled: {},
        select: {
          '&:focus': {},
        },
        icon: {},
        selectMenu: {},
      },
      MuiButtonGroup: {
        root: {},
        contained: {},
        groupedContainedHorizontal: {
          '&:not(:last-child)': {},
        },
        groupedHorizontal: {
          '&:not(:last-child) > div > div': {},
          '&:not(:first-child) > div > div': {},
        },
      },
      MuiTableCell: {
        root: {},
      },
      MuiFab: {
        extended: {
          '&.MuiFab-sizeSmall': {},
        },
        sizeSmall: {},
      },
      MuiButton: {
        root: {
          boxSizing: 'border-box',
          fontWeight: 700,
          height: '40px',
          borderRadius: 12,
          textTransform: 'none',
          padding: '6px 2.25rem',
          backgroundColor: primary,
          color: white,
          margin: '2px',
          '&:hover': {
            color: black,
            backgroundColor: primaryOnHover,
          },
        },
        sizeSmall: {
          borderRadius: '10px',
          height: '35px',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '18px',
        },
        sizeLarge: {
          height: '45px',
        },
        text: {
          width: 90,
        },
        textPrimary: {
          color: white,
        },
        textSecondary: {
          background: premiaBlueNight,
          color: primary,
        },
        containedPrimary: {
          background: `linear-gradient(121.21deg, ${callGradientA} 7.78%, ${callGradientB} 118.78%);`,
          color: black,
          boxShadow: '0px 0px 25px rgba(43, 229, 154, 0.25)',
          '&:hover': {
            background: `linear-gradient(121.21deg, ${callGradientB} 7.78%, ${callGradientA} 118.78%);`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(316.57deg, ${putGradientA} 18.89%, ${putGradientB} 95.84%);`,
          color: black,
          fontWeight: 500,
          boxShadow: '0px 0px 25px rgba(246, 67, 207, 0.4)',
          '&:hover': {
            background: `linear-gradient(316.57deg, ${putGradientB} 18.89%, ${putGradientA} 95.84%);`,
          },
        },
        outlinedPrimary: {
          backgroundColor: premiaBlueNight,
          color: primary,
          border: 'none',
          '&:hover': {
            backgroundColor: 'grey',
            border: 'none',
          },
        },
        outlinedSecondary: {
          backgroundColor: black,
            color: greySecondaryNight,
            border: `1px solid ${dividerGreyNight}`,
            '&:hover': {
              color: textPrimaryNight,
              backgroundColor: black,
              border: `1px solid ${primary}`,
            },
          }
      },
      MuiPaper: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
        rounded: {
          borderRadius: 12,
          border: `1px solid ${dividerGreyNight}`,
        },
      },
      MuiTabs: {
        root: {
          height: 55,
          border: `1px solid ${dividerGreyNight}`,
          padding: '0 8px',
          width: 'auto',
          borderRadius: 12,

          '& .MuiTabs-indicator': {
            background: '#F7FAFF',
            borderRadius: 1.25,
            boxShadow: '0px 0px 2px rgba(82, 148, 255, 0.514578), 0px 0px 6px rgba(255, 255, 255, 0.538381), 0px 0px 11px #5294FF',
          }
        }
      },
      MuiTab: {
        root: {
          fontSize: 14,
          lineHeight: '18px',
          fontWeight: 'normal',
          minWidth: 'auto !important',
          padding: '0 30px',
          width: 'fit-content',

          '& path': {
            fill: greySecondaryNight,
          },

          '& svg': {
            width: '20px',
            height: '18px',
          },

          '&$selected': {
            borderRadius: 10,

            '& path': {
              fill: primary
            }
          },
        },
        labelIcon: {
          minHeight: '50px',
          paddingTop: 0,
        },
        wrapper: {
          textTransform: 'initial',
          flexDirection: 'row',

          '& svg': {
            marginBottom: '0px !important',
            marginRight: 8
          }
        }
      },
      MuiBottomNavigation: {
        root: {
          background: black,
          border: `1px solid ${dividerGreyNight}`,
          borderRadius: 12,
          padding: 8,
          width: 'fit-content',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.07)',
        },
      },
      MuiBottomNavigationAction: {
        root: {
          fontSize: 14,
          lineHeight: '18px',
          fontWeight: 'normal',
          minWidth: 'auto',

          '& path': {
            fill: greySecondaryNight,
          },

          '& svg': {
            width: '20px',
            height: '18px',
          },

          '&$selected': {
            background: 'rgba(82, 148, 255, 0.12)',
            borderRadius: 10,

            '& path': {
              fill: primary
            }
          },
        },
        wrapper: {
          display: 'flex',
          flexDirection: 'row',
        },
        label: {
          marginLeft: 10,
          fontSize: 14,
          lineHeight: '18px',

          '&$selected': {
            fontWeight: 'bold',
          },
        },
      },
    },
  }
));

const theme = { lightTheme, darkTheme };

export default theme;
