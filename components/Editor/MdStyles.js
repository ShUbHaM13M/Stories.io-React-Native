
const defaultFont = "Montserrat"

export default (textColor, borderColor) => ({
	heading: {
		color: textColor
	},
	paragraph: {
		fontFamily: defaultFont,
		fontSize: 16,
		color: textColor
	},
	listItemBullet: {
		paddingRight: 0,
		fontSize: 18,
		color: textColor,
		minWidth: 20,
	},
	listItemNumber: {
		paddingRight: 0,
		fontFamily: defaultFont,
		color: textColor,
		minWidth: 20,
		fontSize: 18
	},
	list: {
		fontFamily: defaultFont,
		color: textColor,
		margin: 6,
		fontSize: 16,
	},
	listItem: {
		fontFamily: defaultFont,
		fontSize: 16,
		color: textColor
	},
	listItemOrderedContent: {
		fontFamily: defaultFont,
		color: textColor,
		fontSize: 16
	},
	listItemUnorderedContent: {
		fontFamily: defaultFont,
		color: textColor,
		fontSize: 16
	},
	link: {
		fontFamily: defaultFont,
	},
	inlineCode: {
		fontFamily: 'Montserrat-Medium',
		color: textColor,
	},
	imageWrapper: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0
	},
	image: {
		flexGrow: 0,
		width: "85%",
		height: "85%",
		alignSelf: 'center',
	},
	strong: {
		fontFamily: 'Montserrat-SemiBold'
	},
	blockQuote: {
		marginLeft: 0,
		borderLeftWidth: 5,
		marginVertical: 10,
		paddingLeft: 10,
		paddingVertical: 4,
		borderColor: `${borderColor}aa`
	}
})