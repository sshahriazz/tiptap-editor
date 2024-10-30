import TextStyle from '@tiptap/extension-text-style';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            /**
             * Set the font size
             */
            setFontSize: (size: string) => ReturnType;
            /**
             * Unset the font size
             */
            unsetFontSize: () => ReturnType;
        };
    }
}

export const FontSize = TextStyle.extend({
    addKeyboardShortcuts() {
        return {
            // "x": () => this.editor.commands.setFontSize(parseInt("16") += 1),
        }
    },
    addAttributes() {
        return {
            ...this.parent?.(),
            fontSize: {
                default: null,
                parseHTML: (element) => element.style.fontSize.replace('px', ''),
                renderHTML: (attributes) => {
                    if (!attributes['fontSize']) {
                        return {};
                    }
                    return {
                        style: `font-size: ${attributes['fontSize']}px`
                    };
                }
            }
        };
    },

    addCommands() {
        return {
            ...this.parent?.(),
            setFontSize:
                (fontSize) =>
                    ({commands}) => {
                        return commands.setMark(this.name, {fontSize: fontSize});
                    },
            unsetFontSize:
                () =>
                    ({chain}) => {
                        return chain()
                            .setMark(this.name, {fontSize: null})
                            .removeEmptyTextStyle()
                            .run();
                    }
        };
    }
});