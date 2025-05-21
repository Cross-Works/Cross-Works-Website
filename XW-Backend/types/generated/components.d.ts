import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksButtonBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_button_blocks';
  info: {
    description: '';
    displayName: 'Button Block';
    icon: 'link';
  };
  attributes: {
    Link: Schema.Attribute.Component<'utils.link', false>;
    Show: Schema.Attribute.Component<'utils.display', false>;
    Style: Schema.Attribute.Component<'utils.button-style', false>;
  };
}

export interface BlocksCardBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_card_blocks';
  info: {
    description: '';
    displayName: 'Card block';
    icon: 'apps';
  };
  attributes: {
    Content: Schema.Attribute.Component<'blocks.text-block', false>;
    Link: Schema.Attribute.Component<'utils.link', false>;
    Thumbnail: Schema.Attribute.Component<'media.image', false>;
  };
}

export interface BlocksTableBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_table_blocks';
  info: {
    displayName: 'Table Block';
    icon: 'apps';
  };
  attributes: {
    Heading: Schema.Attribute.Component<'text.simple-text-line', false>;
    Row: Schema.Attribute.Component<'utils.table', true>;
  };
}

export interface BlocksTextAndImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_text_and_image_blocks';
  info: {
    description: '';
    displayName: 'Text and Media Block';
    icon: 'apps';
  };
  attributes: {
    Media: Schema.Attribute.Component<'media.image', false>;
    MediaPosition: Schema.Attribute.Component<'utils.alignment', false>;
    Text: Schema.Attribute.Component<'text.rich-text', false>;
  };
}

export interface BlocksTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_text_blocks';
  info: {
    displayName: 'Text Block';
    icon: 'apps';
  };
  attributes: {
    Body: Schema.Attribute.Component<'text.rich-text', false>;
    Heading: Schema.Attribute.Component<'text.simple-text-line', false>;
  };
}

export interface MediaImage extends Struct.ComponentSchema {
  collectionName: 'components_media_images';
  info: {
    description: '';
    displayName: 'Single Image';
    icon: 'picture';
  };
  attributes: {
    Caption: Schema.Attribute.Component<'text.simple-text-line', false>;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface MediaMultipleImages extends Struct.ComponentSchema {
  collectionName: 'components_media_multiple_images';
  info: {
    displayName: 'Multiple Images';
    icon: 'picture';
  };
  attributes: {
    Media: Schema.Attribute.Component<'media.image', true>;
  };
}

export interface SharedContactItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_items';
  info: {
    displayName: 'Contact Item';
  };
  attributes: {
    email: Schema.Attribute.Email;
    label: Schema.Attribute.String;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    description: '';
    displayName: 'Footer';
    icon: 'bulletList';
  };
  attributes: {
    Column: Schema.Attribute.Component<'utils.column', true>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedNavigation extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigations';
  info: {
    displayName: 'Navigation';
    icon: 'bulletList';
  };
  attributes: {
    Link: Schema.Attribute.Component<'utils.link', true>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['LinkedIn', 'Instagram', 'YouTube', 'Facebook', 'Twitter']
    >;
    url: Schema.Attribute.Text;
  };
}

export interface TextRichText extends Struct.ComponentSchema {
  collectionName: 'components_text_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'bold';
  };
  attributes: {
    Text: Schema.Attribute.Blocks;
  };
}

export interface TextRichTextMarkdown extends Struct.ComponentSchema {
  collectionName: 'components_text_rich_text_markdowns';
  info: {
    displayName: 'Rich Text - Markdown';
    icon: 'bold';
  };
  attributes: {
    Text: Schema.Attribute.RichText;
  };
}

export interface TextSimpleTextLine extends Struct.ComponentSchema {
  collectionName: 'components_text_simple_text_lines';
  info: {
    description: '';
    displayName: 'Simple Text - Single Line';
    icon: 'bold';
  };
  attributes: {
    Text: Schema.Attribute.String;
  };
}

export interface TextSimpleTextMultiLine extends Struct.ComponentSchema {
  collectionName: 'components_text_simple_text_multi_lines';
  info: {
    displayName: 'Simple Text - Multi Line';
    icon: 'bold';
  };
  attributes: {
    Text: Schema.Attribute.Text;
  };
}

export interface UtilsAlignment extends Struct.ComponentSchema {
  collectionName: 'components_utils_alignments';
  info: {
    description: '';
    displayName: 'Align';
    icon: 'bulletList';
  };
  attributes: {
    Align: Schema.Attribute.Enumeration<['Left', 'Right', 'Auto']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Left'>;
  };
}

export interface UtilsButtonStyle extends Struct.ComponentSchema {
  collectionName: 'components_utils_button_styles';
  info: {
    displayName: 'Button Style';
    icon: 'brush';
  };
  attributes: {
    ButtonStyle: Schema.Attribute.Enumeration<
      ['Primary', 'Secondary', 'Link', 'Auto']
    >;
  };
}

export interface UtilsColumn extends Struct.ComponentSchema {
  collectionName: 'components_utils_columns';
  info: {
    description: '';
    displayName: 'Column';
    icon: 'bulletList';
  };
  attributes: {
    Body: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    Link: Schema.Attribute.Component<'utils.link', false>;
    Socials: Schema.Attribute.Component<'utils.show-socials', false>;
  };
}

export interface UtilsDisplay extends Struct.ComponentSchema {
  collectionName: 'components_utils_displays';
  info: {
    displayName: 'Display';
    icon: 'bulletList';
  };
  attributes: {
    Display: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface UtilsLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_links';
  info: {
    description: '';
    displayName: 'Internal Link';
    icon: 'link';
  };
  attributes: {
    Slug: Schema.Attribute.String;
    Text: Schema.Attribute.String;
  };
}

export interface UtilsPublishedTime extends Struct.ComponentSchema {
  collectionName: 'components_utils_published_times';
  info: {
    displayName: 'PublishedTime';
    icon: 'clock';
  };
  attributes: {
    PublishedDateTime: Schema.Attribute.DateTime;
  };
}

export interface UtilsShowSocials extends Struct.ComponentSchema {
  collectionName: 'components_utils_show_socials';
  info: {
    description: '';
    displayName: 'ShowSocials';
    icon: 'bulletList';
  };
  attributes: {
    ShowSocials: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface UtilsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'globe';
  };
  attributes: {
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface UtilsTable extends Struct.ComponentSchema {
  collectionName: 'components_utils_tables';
  info: {
    description: '';
    displayName: 'Table Row';
    icon: 'bulletList';
  };
  attributes: {
    Description: Schema.Attribute.Component<'text.simple-text-line', false>;
    Foot: Schema.Attribute.Component<'text.simple-text-line', false>;
    Heading: Schema.Attribute.Component<'text.simple-text-line', false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.button-block': BlocksButtonBlock;
      'blocks.card-block': BlocksCardBlock;
      'blocks.table-block': BlocksTableBlock;
      'blocks.text-and-image-block': BlocksTextAndImageBlock;
      'blocks.text-block': BlocksTextBlock;
      'media.image': MediaImage;
      'media.multiple-images': MediaMultipleImages;
      'shared.contact-item': SharedContactItem;
      'shared.footer': SharedFooter;
      'shared.media': SharedMedia;
      'shared.navigation': SharedNavigation;
      'shared.quote': SharedQuote;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.social-link': SharedSocialLink;
      'text.rich-text': TextRichText;
      'text.rich-text-markdown': TextRichTextMarkdown;
      'text.simple-text-line': TextSimpleTextLine;
      'text.simple-text-multi-line': TextSimpleTextMultiLine;
      'utils.alignment': UtilsAlignment;
      'utils.button-style': UtilsButtonStyle;
      'utils.column': UtilsColumn;
      'utils.display': UtilsDisplay;
      'utils.link': UtilsLink;
      'utils.published-time': UtilsPublishedTime;
      'utils.show-socials': UtilsShowSocials;
      'utils.social-link': UtilsSocialLink;
      'utils.table': UtilsTable;
    }
  }
}
