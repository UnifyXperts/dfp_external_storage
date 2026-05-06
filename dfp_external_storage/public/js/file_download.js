frappe.ui.form.on("File", {
    refresh(frm) {
        const $download = frm.page.inner_toolbar
            .find("button, a")
            .filter((_, el) => $(el).text().trim().toLowerCase().includes("download"));

        $download.off("click").on("click", async function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (frm.doc.dfp_external_storage) {
                const r = await frappe.call({
                    method: "dfp_external_storage.dfp_external_storage.doctype.dfp_external_storage.dfp_external_storage.get_download_url",
                    args: { file_name: frm.doc.name }
                });
                if (r.message) {
                    window.open(r.message, "_blank");
                }
            } else {
                window.open(frm.doc.file_url, "_blank");
            }
        });
    }
});