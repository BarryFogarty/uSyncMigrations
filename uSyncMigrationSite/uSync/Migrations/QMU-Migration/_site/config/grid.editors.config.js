[
  {
    "name": "Rich text editor",
    "nameTemplate": null,
    "alias": "rte",
    "view": "rte",
    "render": null,
    "icon": "icon-article",
    "config": {}
  },
  {
    "name": "Image",
    "nameTemplate": "{{ value && value.udi ? (value.udi | ncNodeName) : '' }}",
    "alias": "media",
    "view": "media",
    "render": null,
    "icon": "icon-picture",
    "config": {}
  },
  {
    "name": "Macro",
    "nameTemplate": "{{ value && value.macroAlias ? value.macroAlias : '' }}",
    "alias": "macro",
    "view": "macro",
    "render": null,
    "icon": "icon-settings-alt",
    "config": {}
  },
  {
    "name": "Embed",
    "nameTemplate": null,
    "alias": "embed",
    "view": "embed",
    "render": null,
    "icon": "icon-movie-alt",
    "config": {}
  },
  {
    "name": "Headline",
    "nameTemplate": "{{ value }}",
    "alias": "headline",
    "view": "textstring",
    "render": null,
    "icon": "icon-coin",
    "config": {
      "style": "font-size: 36px; line-height: 45px; font-weight: bold",
      "markup": "<h1>#value#</h1>"
    }
  },
  {
    "name": "Quote",
    "nameTemplate": "{{ value ? value.substring(0,32) + (value.length > 32 ? '...' : '') : '' }}",
    "alias": "quote",
    "view": "textstring",
    "render": null,
    "icon": "icon-quote",
    "config": {
      "style": "border-left: 3px solid #ccc; padding: 10px; color: #ccc; font-family: serif; font-style: italic; font-size: 18px",
      "markup": "<blockquote>#value#</blockquote>"
    }
  },
  {
    "name": "Paragraph",
    "nameTemplate": null,
    "alias": "paragraph",
    "view": "textstring",
    "render": null,
    "icon": "icon-font",
    "config": {
      "style": "font-size: 16px; line-height: 20px; font-weight: light;",
      "markup": "<p>#value#</p>"
    }
  },
  {
    "name": "BA Headline",
    "nameTemplate": null,
    "alias": "BAheadline",
    "view": "textstring",
    "render": null,
    "icon": "icon-coin color-blue",
    "config": {
      "style": "font-size: 36px; line-height: 45px; font-weight: bold",
      "markup": "<h1>#value#</h1>"
    }
  },
  {
    "name": "BA Paragraph",
    "nameTemplate": null,
    "alias": "baparagraph",
    "view": "textstring",
    "render": null,
    "icon": "icon-font color-blue",
    "config": {
      "style": "font-size: 16px; line-height: 20px; font-weight: light;",
      "markup": "<p class='left-subtext'>#value#</p>"
    }
  },
  {
    "name": "Top Image Overlay - Single Line",
    "nameTemplate": null,
    "alias": "FPG Main top image overlay",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-green",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:10px; position:absolute; font-size:24px; margin-top:-49px; background-color:white; opacity:0.92;'>#value#</p>"
    }
  },
  {
    "name": "Top Image Overlay - Double Line",
    "nameTemplate": null,
    "alias": "FPG Main top image overlay - double",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-green",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:10px; position:absolute; font-size:24px; margin-top:-75px; margin-bottom:0px; background-color:white;opacity:0.92;'>#value#</p>"
    }
  },
  {
    "name": "Bottom Image Overlay - Single Line",
    "nameTemplate": null,
    "alias": "FPG Main bottom image overlay",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-green",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:10px; position:absolute; font-size:24px; margin-top:-49px; margin-bottom:0px; background-color:white;opacity:0.92;'>#value#</p>"
    }
  },
  {
    "name": "Bottom Image Overlay - Double Line",
    "nameTemplate": null,
    "alias": "FPG Main bottom image overlay - double",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-green",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:10px; position:absolute; font-size:24px; margin-top:-75px; margin-bottom:0px; background-color:white;opacity:0.92;'>#value#</p>"
    }
  },
  {
    "name": "FPG - Top Row Middle Paragraph",
    "nameTemplate": null,
    "alias": "fpgmiddleparagraph",
    "view": "textstring",
    "render": null,
    "icon": "icon-font color-blue",
    "config": {
      "style": "",
      "markup": "<p style='font-size:24px; color:black; padding-left:3px; padding:20px;'>#value#</p>"
    }
  },
  {
    "name": "FPG Main right overlay - Single Line",
    "nameTemplate": null,
    "alias": "FPG Main right overlay",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-green",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:5px; position:absolute; font-size:18px; margin-top:-41px; margin-bottom:0px; background-color:white;opacity:0.92;width:450px;'>#value#</p>"
    }
  },
  {
    "name": "FPG Main right overlay - Double Line",
    "nameTemplate": null,
    "alias": "FPG Main right overlay - Double",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-green",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:5px; position:absolute; font-size:18px; margin-top:-67px; margin-bottom:0px; background-color:white;opacity:0.92;width:450px;'>#value#</p>"
    }
  },
  {
    "name": "FPG middle row overlay - Single Line",
    "nameTemplate": null,
    "alias": "FPG middle row overlay",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-red",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:10px; position:absolute; font-size:24px; margin-top:-46px; margin-bottom:0px; background-color:white;opacity:0.92;'>#value#</p>"
    }
  },
  {
    "name": "FPG middle row overlay - Double Line",
    "nameTemplate": null,
    "alias": "FPG middle row overlay - Double",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-red",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:10px; position:absolute; font-size:24px; margin-top:-72px; margin-bottom:0px; background-color:white;opacity:0.92;'>#value#</p>"
    }
  },
  {
    "name": "Middle Row Content",
    "nameTemplate": null,
    "alias": "fpgmiddlerowcontent",
    "view": "textstring",
    "render": null,
    "icon": "icon-font color-red",
    "config": {
      "style": "",
      "markup": "<p style='width:615px; height:260px; font-size:24px; padding:20px;'>#value#</p>"
    }
  },
  {
    "name": "FPG bottom row overlay - Single Line",
    "nameTemplate": null,
    "alias": "FPG bottom row overlay",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-blue",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:5px; position:absolute; font-size:18px; margin-top:-36px; margin-bottom:0px; background-color:white;opacity:0.92;'>#value#</p>"
    }
  },
  {
    "name": "FPG bottom row overlay - Double Line",
    "nameTemplate": null,
    "alias": "FPG bottom row overlay - Double",
    "view": "textstring",
    "render": null,
    "icon": "icon-edit color-blue",
    "config": {
      "style": "",
      "markup": "<p style='color:black; padding:5px; position:absolute; font-size:18px; margin-top:-62px; margin-bottom:0px; background-color:white;opacity:0.92;'>#value#</p>"
    }
  },
  {
    "name": "FPG links",
    "nameTemplate": null,
    "alias": "fpgbottomrowlink",
    "view": "rte",
    "render": null,
    "icon": "icon-article",
    "config": {
      "style": "font-size:36px; float:right;",
      "markup": "<p style='color:purple'>#value#</p>"
    }
  },
  {
    "name": "Takeover Headline Center Left",
    "nameTemplate": null,
    "alias": "Takeover Headline",
    "view": "textstring",
    "render": null,
    "icon": "icon-font color-blue",
    "config": {
      "style": "",
      "markup": "<h1 class='headercentreleft' style='color:black; width: 35%; opacity: 0.8; position: absolute; top:43%; margin-left: 25px; padding:10px; font-size:36px;'><span style='background-color: white; box-shadow: 10px 0 0 #fff, -10px 0 0 #fff;-webkit-box-decoration-break: clone; padding:10px; line-height: 1.4;'>#value#</span></h1>"
    }
  },
  {
    "name": "Takeover Headline Top Left",
    "nameTemplate": null,
    "alias": "Takeover Headline Top Left",
    "view": "textstring",
    "render": null,
    "icon": "icon-font color-red",
    "config": {
      "style": "",
      "markup": "<h1 class='headertopleft' style='color:black; width: 35%; opacity: 0.8; position: absolute; top:14%; margin-left: 25px; padding:10px; font-size:36px;'><span style='background-color: white; box-shadow: 10px 0 0 #fff, -10px 0 0 #fff;-webkit-box-decoration-break: clone; padding:10px; line-height: 1.4;'>#value#</span></h1>"
    }
  },
  {
    "name": "Takeover Headline Bottom Left",
    "nameTemplate": null,
    "alias": "Takeover Headline Bottom Left",
    "view": "textstring",
    "render": null,
    "icon": "icon-font color-green",
    "config": {
      "style": "",
      "markup": "<h1 class='headerbottomleft' style='color:black; width: 35%; opacity: 0.8; position: absolute; top:68%; margin-left: 25px; padding:10px; font-size:36px;'><span style='background-color: white; box-shadow: 10px 0 0 #fff, -10px 0 0 #fff;-webkit-box-decoration-break: clone; padding:10px; line-height: 1.4;'>#value#</span></h1>"
    }
  },
  {
    "name": "Takeover Sub Headline Centre Left",
    "nameTemplate": null,
    "alias": "Takeover Sub Headline Centre Left",
    "view": "textstring",
    "render": null,
    "icon": "icon-quote color-blue",
    "config": {
      "style": "",
      "markup": "<p class='subheadercentreleft' style='color:black; top:54%; opacity: 0.8; margin-left: 25px; padding:10px; position:absolute; font-size:24px; width:25%;'><span style='background-color: white; box-shadow: 10px 0 0 #fff, -10px 0 0 #fff;-webkit-box-decoration-break: clone; padding:10px; line-height: 1.6;'>#value#</span></p>"
    }
  },
  {
    "name": "Takeover Sub Headline Top Left",
    "nameTemplate": null,
    "alias": "Takeover Sub Headline Top Left",
    "view": "textstring",
    "render": null,
    "icon": "icon-quote color-red",
    "config": {
      "style": "",
      "markup": "<p class='subheadertopleft' style='color:black; top:25%; opacity: 0.8; margin-left: 25px; padding:10px; position:absolute; font-size:24px; width:25%; line-height: 1.6;'><span style='background-color: white; box-shadow: 10px 0 0 #fff, -10px 0 0 #fff;-webkit-box-decoration-break: clone; padding:10px; '>#value#</span></p>"
    }
  },
  {
    "name": "Takeover Sub Headline Bottom Left",
    "nameTemplate": null,
    "alias": "Takeover Sub Headline Bottom Left",
    "view": "textstring",
    "render": null,
    "icon": "icon-quote color-green",
    "config": {
      "style": "",
      "markup": "<p class='subheaderbottomleft' style='color:black; top:79%; opacity: 0.8; margin-left: 25px; padding:10px; position:absolute; font-size:24px; width:25%;'><span style='background-color: white; box-shadow: 10px 0 0 #fff, -10px 0 0 #fff;-webkit-box-decoration-break: clone; padding:10px; line-height: 1.4;'>#value#</span></p>"
    }
  },
  {
    "name": "Quad Box Text",
    "nameTemplate": null,
    "alias": "Quad Box Text",
    "view": "textstring",
    "render": null,
    "icon": "icon-quote color-green",
    "config": {
      "style": "",
      "markup": "<p class='' style='width:285px; height:205px; margin-top: 0; padding: 20px; font-size: 30px; line-height: 1.3; margin-bottom:25px;'>#value#</span></p>"
    }
  },
  {
    "name": "Banded Image",
    "nameTemplate": null,
    "alias": "bandedImage",
    "view": "media",
    "render": null,
    "icon": "icon-picture",
    "config": {
      "size": {
        "height": 200,
        "width": 300
      }
    }
  },
  {
    "name": "Focus Panels",
    "nameTemplate": null,
    "alias": "focusPanels",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "focusPanels"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "GLP Content Section",
    "nameTemplate": null,
    "alias": "glpContentSection",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "glpContent"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "Contact Picker",
    "nameTemplate": null,
    "alias": "Contact Picker",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "contactPicker"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "Image Links",
    "nameTemplate": null,
    "alias": "Links",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "links"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "Useful Links",
    "nameTemplate": null,
    "alias": "Useful Links",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "usefulLinks"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "RC Social Media",
    "nameTemplate": null,
    "alias": "Social Media",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "rCSocMed"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "News Events Blogs",
    "nameTemplate": null,
    "alias": "News Events Blogs",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "newsEventsBlogs"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "RC Event",
    "nameTemplate": null,
    "alias": "RC Event",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "rCEvent"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "Custom Social Media",
    "nameTemplate": null,
    "alias": "Custom Social Media",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "customSocialMedia"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "Quotes",
    "nameTemplate": null,
    "alias": "Quotes",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-item-arrangement",
    "config": {
      "allowedDocTypes": [
        "quotes"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "Event from Library",
    "nameTemplate": null,
    "alias": "eventFromLibrary",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-calendar",
    "config": {
      "allowedDocTypes": [
        "eventFromLibrary"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "Useful Links from Library",
    "nameTemplate": null,
    "alias": "usefulLinksFromLibrary",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-link",
    "config": {
      "allowedDocTypes": [
        "usefulLinksFromLibrary"
      ],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/",
      "previewViewPath": "/Views/Partials/Grid/Editors/DocTypeGridEditor/Previews/",
      "previewCssFilePath": "",
      "previewJsFilePath": ""
    }
  },
  {
    "name": "Form",
    "nameTemplate": null,
    "alias": "umbraco_form_picker",
    "view": "/App_Plugins/UmbracoForms/Backoffice/GridEditors/formpicker.html",
    "render": "macro",
    "icon": "icon-umb-contour",
    "config": {}
  }
]