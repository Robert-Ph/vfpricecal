import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

interface Props {
    file: string;
}

export default function PdfViewer({ file }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);


   useEffect(() => {
    let cancelled = false;
    const loadPdf = async () => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = "";

        const pdf = await pdfjsLib.getDocument({
            url: file,
        }).promise;

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            if (cancelled) return;
            const page = await pdf.getPage(pageNumber);

            const viewport = page.getViewport({ scale: 1 });

            const width = containerRef.current.clientWidth || viewport.width;
            const scale = width / viewport.width;

            const scaledViewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) continue;

            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            canvas.style.width = "100%";
            canvas.style.display = "block";
            canvas.style.marginBottom = "24px";
            canvas.style.borderRadius = "12px";
            canvas.style.boxShadow = "0 2px 10px rgba(0,0,0,.08)";

            await page.render({
                canvas,
                canvasContext: context,
                viewport: scaledViewport,
            }).promise;

            containerRef.current.appendChild(canvas);
        }
    };

    loadPdf().catch(console.error);
    return () => {
        cancelled = true;
    };
}, [file]);

    return <div ref={containerRef} />;
}