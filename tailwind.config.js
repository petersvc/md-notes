/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
	darkMode: 'class',
  theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			dark: {
				0: 'rgb(100,100,100)',
				10: 'rgb(45,45,45)',
				20: 'rgb(40,40,40)',
				30: 'rgb(35,35,35)',
				40: 'rgb(30,30,30)',
				50: 'rgb(25,25,25)',
				60: 'rgb(20,20,20)',
				70: 'rgb(15,15,15)',
				80: 'rgb(10,10,10)',
				90: 'rgb(5,5,5)',
				100: 'rgb(0,0,0)',
			},
			light: {
				0: 'rgb(150,150,150)',
				10: 'rgb(205,205,205)',
				20: 'rgb(210,210,210)',
				30: 'rgb(215,215,215)',
				40: 'rgb(220,220,220)',
				50: 'rgb(225,225,225)',
				60: 'rgb(230,230,230)',
				70: 'rgb(235,235,235)',
				80: 'rgb(240,240,240)',
				90: 'rgb(245,245,245)',
				100: 'rgb(250,250,250)',
			}
		},
    extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif']
			},
		},
  },
  plugins: [],
}

