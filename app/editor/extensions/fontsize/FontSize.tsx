"use client"

import {useCallback, useEffect, useState} from "react"
import {Minus, Plus} from "lucide-react"
import {Button, Input} from "@nextui-org/react";
import {useCurrentEditor} from "@tiptap/react";

export default function FontSize() {
    const {editor} = useCurrentEditor()

    const [inputValue, setInputValue] = useState("16")
    const [isValid, setIsValid] = useState(true)

    const getFontSize = useCallback(() => {
        return editor!.getAttributes('textStyle').fontSize ?? "16"
    }, [editor])

    useEffect(() => {
        console.log("logging")
        setInputValue(getFontSize() ?? "16")
        console.log(getFontSize(), "fontSize")
    }, [getFontSize])

    const parseInput = (value: string): number => {
        const num = parseFloat(value)
        return /^\d*\.?\d+$/.test(value) ? num : NaN
    }

    const updateFontSize = useCallback((newSize: number) => {
        const validSize = Math.max(1, newSize)
        setInputValue(validSize.toString())
        setIsValid(true)
    }, [])

    const changeFontSize = (delta: number) => {
        const size = parseInput(inputValue)
        updateFontSize(size + delta)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)

        const size = parseInput(value)
        setIsValid(!isNaN(size) && size > 0)
    }

    const handleInputBlur = () => {
        const size = parseInput(inputValue)
        if (isNaN(size) || size < 1) {
            updateFontSize(16)
        } else {
            updateFontSize(size)
        }
    }

    useEffect(() => {
        if (isValid && editor) {
            editor.chain().focus().setFontSize(inputValue).run()
        }
    }, [editor, isValid, inputValue]);

    return (
        <div className="flex items-center justify-center space-x-2">
            <Button
                variant={'flat'}
                size="sm"
                isIconOnly
                onClick={() => changeFontSize(-1)}
                aria-label="Decrease font size"
            >
                <Minus className="h-4 w-4"/>
            </Button>
            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-24 text-center ${isValid ? 'text-primary' : 'text-red-500'}`}
                aria-label="Font size"
                aria-invalid={!isValid}
                style={{color: isValid ? 'inherit' : 'red'}}
            />
            <Button
                variant={"flat"}
                size={"sm"}
                isIconOnly
                onClick={() => changeFontSize(1)}
                aria-label="Increase font size"
            >
                <Plus className="h-4 w-4"/>
            </Button>
        </div>
    )
}