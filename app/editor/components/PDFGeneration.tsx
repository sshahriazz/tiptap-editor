import {Document, Page, PDFViewer, Text, View} from '@react-pdf/renderer';
import React from 'react';
import {JSONContent, useCurrentEditor} from '@tiptap/react';

// Function to convert JSON node to React-PDF components
const convertToReactPdf = (node) => {
    switch (node.type) {
        case 'paragraph':
            return (
                <Text style={{textAlign: node.attrs?.textAlign}}>
                    {node.content?.map(childNode => convertToReactPdf(childNode))}
                </Text>
            );
        case 'text':
            // Process inline styles and nested marks (bold, italic, etc.)
            const textStyles = parseMarks(node.marks);
            return <Text style={textStyles}>{node.text}</Text>;
        case 'table':
            return (
                <View style={tableStyle}>
                    {node.content?.map(rowNode => convertToReactPdf(rowNode))}
                </View>
            );
        case 'tableRow':
            return (
                <View style={tableRowStyle}>
                    {node.content?.map(cellNode => convertToReactPdf(cellNode))}
                </View>
            );
        case 'tableCell':
        case 'tableHeader':
            return (
                <View
                    style={node.type === 'tableHeader' ? tableHeaderStyle : tableCellStyle}
                    colSpan={node.attrs?.colSpan}
                >
                    {node.content?.map(childNode => convertToReactPdf(childNode))}
                </View>
            );
        default:
            return null;
    }
};

// Utility to parse mark styles
const parseMarks = (marks) => {
    const style = {};
    if (!marks) return style;
    marks.forEach(mark => {
        switch (mark.type) {
            case 'textStyle':
                style.color = mark.attrs?.color;
                break;
            case 'bold':
                style.fontWeight = 'bold';
                break;
            case 'italic':
                style.fontStyle = 'italic';
                break;
            case 'underline':
                style.textDecoration = style.textDecoration
                    ? `${style.textDecoration} underline`
                    : 'underline';
                break;
            case 'strike':
                style.textDecoration = style.textDecoration
                    ? `${style.textDecoration} line-through`
                    : 'line-through';
                break;
            case 'highlight':
                style.backgroundColor = mark.attrs?.color || '#ffff00'; // Default highlight color
                break;
        }
    });
    return style;
};

// Styles for table layout
const tableStyle = {display: 'table', width: '100%'};
const tableRowStyle = {display: 'table-row', flexDirection: 'row'};
const tableCellStyle = {display: 'table-cell', padding: 4};
const tableHeaderStyle = {
    display: 'table-cell',
    padding: 4,
    fontWeight: 'bold'
};

// Function to process the root content array
const renderPdfContent = (content) => content.map(node => convertToReactPdf(node));

const PdfGeneration = () => {
    const {editor} = useCurrentEditor();
    if (!editor) return null;
    const data: JSONContent = editor.getJSON();
    if (!data.content) return null;

    return (
        <PDFViewer>
            <Document>
                <Page style={{padding: 30}} size="A4">
                    {renderPdfContent(data.content)}
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PdfGeneration;