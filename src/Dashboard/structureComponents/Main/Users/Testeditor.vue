<template>
  <div>
    <Editor v-model="content" ref="editor"></Editor>
    <Button @click="toggleMode" plain text raised>{{ editorMode }}</Button>
  </div>
</template>

 
<script>
import Editor from 'primevue/editor';
import Delta from 'quill-delta';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { compile, convert } from 'html-to-text';
import html from 'js-beautify'
 
export default {
    name: 'MyComponent',
    components: {
        Editor
    },
    data() {
        return {
            content: `<div>
                            <div>
                                <img src="https://api.QRGenerator.sk/by-square/pay/qr.png?iban=SK2709000000005112386457&amount=40&currency=EUR&vs={symbol}&payment_note=ufp-clenske-2023&due_date=2023-06-03&size=256&transparent=false" alt="QR kod"/>
                            </div>
                            <h3 style="font-weight:bold;">Únia futbalových profesionálov</h3>
                            <div><img src="https://ufp.sk/wp-content/uploads/2023/04/cropped-logo-transp.png" alt="logo Ufp"></div>
                            <h4>Miletičova 5, 821 08 Bratislava</h4>
                            <h4>info@ufp.sk</h4>
                            <h4>ufp.sk</h4>
                        </div>`,
            editorMode: 'HTML'
        };
    },
    methods: {
        toggleMode() {
            const editor = this.$refs.editor.quill;
            const mode = this.editorMode;
            if (mode === 'HTML') {
                const delta = new Delta().insert(editor.root.innerHTML);
                editor.setContents(delta);
                this.editorMode = 'Plain Text';
            } else {
                const delta = editor.getContents();
                const converter = new QuillDeltaToHtmlConverter(delta.ops);
                const html = converter.convert()
 
                const options = {
					wordwrap: 130,
                    preserveNewlines: true
                };
                const text = convert(html, options);
				
                editor.root.innerHTML = text;
                this.editorMode = 'HTML';
            }
        },
    }
};
</script>
