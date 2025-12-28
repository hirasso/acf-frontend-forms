const $ = window.jQuery;

import feather from "feather-icons";
import type { ACFAttachmentField, ImageFieldSettings } from "../types.js";

export default class DropZone {
  field: ACFAttachmentField;
  $el: ACFAttachmentField["$el"];
  $input: JQuery<HTMLElement>;
  $image: JQuery<HTMLImageElement>;
  $clear: JQuery<HTMLElement>;
  $uploader: JQuery<HTMLElement>;
  $instructions: JQuery<HTMLElement>;
  dataSettings: ImageFieldSettings;
  currentImageSrc: string | undefined;
  lastInputVal: string | number | string[] | undefined;

  constructor(field: ACFAttachmentField) {
    this.field = field;
    this.$el = field.$el;

    this.$input = this.$el.find('input[type="file"]');
    this.$image = this.$el.find(".image-wrap img");
    this.$clear = this.$el.find('[data-name="remove"]');
    this.$clear.html(feather.icons["x-circle"].toSvg());

    this.$uploader = this.$el.find(".acf-image-uploader");
    this.$instructions = this.$el.find(".instructions");
    this.$instructions.appendTo(this.$uploader);
    this.dataSettings = this.$instructions.data("settings");

    this.$el.addClass("acfff-dropzone");
    this.setupEvents();
    this.renderImage(this.$image.attr("src"));
  }

  maybeGet<T>(
    key: string,
    object: any,
    fallback: T | undefined,
  ): T | undefined {
    let value = (object || {})[key];
    return value != null ? value : fallback;
  }

  setupEvents() {
    const eventProps = ($ as any).event.props;
    if ($.inArray("dataTransfer", eventProps) === -1) {
      eventProps.push("dataTransfer");
    }

    this.$uploader.on("dragover", (e) => {
      e.preventDefault();
      this.$uploader.addClass("is-dragover");
    });

    this.$uploader.on("dragleave", () => {
      this.$uploader.removeClass("is-dragover");
    });

    this.$uploader.on("drop", (e) => {
      e.preventDefault();
      this.$uploader.removeClass("is-dragover");
      const inputElement = this.$input.get(0) as HTMLInputElement;
      const dataTransfer = (e as any).dataTransfer as DataTransfer;
      if (inputElement && dataTransfer) {
        inputElement.files = dataTransfer.files;
      }
      this.$input.trigger("change");
      // this.parseFile( e.dataTransfer.files[0] );
    });

    this.$clear.off().on("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.clear();
    });

    this.currentImageSrc = this.$image.attr("src");

    this.lastInputVal = this.$input.val();
    this.$input.on("change", () => this.onInputChange(this.$input));
  }

  renderImage(src: string | undefined) {
    if (typeof src === "undefined" || !src.length) {
      return;
    }

    let img = new Image();
    img.onload = () => {
      let ratio = img.height / img.width;
      if (ratio < 0.5) {
        this.clear([
          `The image can't be more than twice the width of it's height`,
        ]);
        return;
      } else if (ratio > 2) {
        this.clear([
          `The image can't be more than twice the height of it's width`,
        ]);
        return;
      }
      let paddingBottom = Math.floor(ratio * 100);
      this.$uploader.css({
        paddingBottom: `${paddingBottom}%`,
      });

      this.$image.attr("src", src);
      this.$uploader.addClass("has-value");

      $(document).trigger("acfff:form-resized");
    };
    img.src = src;
  }

  clear(errors: string[] | false = false) {
    this.field.removeAttachment();
    this.$input.val("");
    this.lastInputVal = this.$input.val();
    this.$uploader.css({ paddingBottom: "" });
    if (errors) {
      this.field.showError(errors.join("<br>"));
    }
  }

  onInputChange($input: JQuery<HTMLElement>) {
    if (this.lastInputVal === $input.val()) {
      return;
    }
    this.lastInputVal = $input.val();
    if ($input.val()) {
      const inputElement = $input[0] as HTMLInputElement;
      const file = inputElement.files?.[0];
      if (file) {
        this.parseFile(file);
      }
    } else {
      this.clear();
    }
  }

  parseFile(file: File) {
    let reader = new FileReader();
    reader.onload = (e) => {
      let errors = this.getErrors(file);
      if (!errors) {
        this.renderImage(e.target?.result as string);
        this.field.removeError();
      } else {
        this.clear(errors);
        this.renderImage(this.currentImageSrc);
      }
    };
    reader.readAsDataURL(file);
  }

  getErrors(file: File): string[] | null {
    let errors: string[] = [];

    // Check for max size
    let maxSize = this.maybeGet<{
      value: number;
      error: string;
    }>("max_size", this.dataSettings.restrictions, undefined);
    if (maxSize && file.size / 1000000 > maxSize.value) {
      errors.push(maxSize.error);
    }

    // Check for mime type
    let mimeTypes = this.maybeGet<{
      value: string[];
      error: string;
    }>("mime_types", this.dataSettings.restrictions, undefined);
    if (mimeTypes) {
      let extension = file.name.split(".").pop()?.toLowerCase(); // file extension from input file
      if (extension) {
        let isValidMimeType = $.inArray(extension, mimeTypes.value) > -1; // is extension in acceptable types
        if (!isValidMimeType) {
          errors.push(mimeTypes.error);
        }
      }
    }

    return errors.length ? errors : null;
  }
}
