# Homepage Setup Guide

This guide will help you set up a comprehensive homepage for Saint Helen Catholic Church using the blocks built in the CMS.

## Accessing the CMS

1. Start the development server: `pnpm dev`
2. Navigate to `http://localhost:3000/admin`
3. Create your admin account
4. Go to **Pages** → **Home** (or create a new page with slug `home`)

---

## Recommended Homepage Structure

Here's a comprehensive homepage layout using the blocks we've built:

### 1. **Hero Section** - HeroWithStats
> First impression with key statistics

**Configuration:**
- **Eyebrow Text**: "Welcome to"
- **Title**: "Saint Helen Catholic Church"
- **Subtitle**: "A vibrant Catholic community in [City Name], welcoming all to grow in faith, fellowship, and service."
- **Background Image**: Upload a beautiful church photo
- **Background Overlay**: Medium or Dark
- **Buttons**:
  - Primary: "Plan Your Visit" → `/visit`
  - Secondary: "Mass Times" → `/mass-times`
- **Statistics**:
  - Value: "2,500+", Label: "Parishioners"
  - Value: "35", Label: "Active Ministries"
  - Value: "50 Years", Label: "Serving the Community"
- **Appearance**: Background Variant = Transparent (let the image show)

---

### 2. **Alert Banner** (Optional)
> For important announcements

**Configuration:**
- **Message**: "Join us for our Annual Parish Festival on June 15th!"
- **Type**: Info
- **Link Label**: "Learn More"
- **Link URL**: `/events/parish-festival`
- **Dismissible**: Yes

---

### 3. **BentoGrid** - Core Journeys
> Quick access to primary needs

**Configuration:**
- **Title**: "How Can We Serve You Today?"
- **Items**:
  1. **New Here?**
     - Icon: User Plus
     - Description: "Plan your first visit and learn about our community"
     - Link: `/visit`
     - Variant: Brand

  2. **Mass Times**
     - Icon: Calendar
     - Description: "Weekend and weekday Mass schedule"
     - Link: `/mass-times`
     - Variant: Primary

  3. **Watch Online**
     - Icon: Video
     - Description: "Join our livestream Mass from anywhere"
     - Link: `/watch-online`
     - Variant: Primary

  4. **Get Involved**
     - Icon: Hand Heart
     - Description: "Discover ministries and ways to serve"
     - Link: `/ministries`
     - Variant: Primary

  5. **LifeLines**
     - Icon: Users
     - Description: "Find your small group community"
     - Link: `/lifelines`
     - Variant: Accent

  6. **Give**
     - Icon: Heart
     - Description: "Support our parish mission"
     - Link: `/give`
     - Variant: Gold

---

### 4. **RichTextSection** - Welcome Message
> Pastor's welcome or mission statement

**Configuration:**
- **Title**: "Welcome from Our Pastor"
- **Content**: *[Add pastor's welcome message in rich text editor]*
- **Appearance**:
  - Background Variant: Light
  - Alignment: Left
  - Padding: Large

---

### 5. **EventList** - Upcoming Events
> Show what's happening

**Configuration:**
- **Title**: "Upcoming Events"
- **Subtitle**: "Join us for these upcoming gatherings and celebrations"
- **Mode**: Upcoming
- **Category Filter**: (leave empty for all)
- **Limit**: 6
- **Layout**: Cards
- **Show View All Link**: Yes
- **View All URL**: `/events`
- **Appearance**: Background Variant = Transparent

---

### 6. **Divider**
> Visual separation

**Configuration:**
- **Style**: Decorative
- **Width**: Full Width
- **Appearance**: Background = Light, Padding = Medium

---

### 7. **StoryHighlight** - Featured Story/Testimony
> Inspire visitors with a real story

**Configuration:**
- **Title**: "Finding Community Through LifeLines"
- **Body**: *[Add a testimony or story about parish life]*
- **Image**: Upload a relevant photo
- **Tag**: "Testimony"
- **Image Position**: Left
- **Link URL**: `/stories` (optional)
- **Link Label**: "Read More Stories"
- **Appearance**: Background = Surface, Padding = Large

---

### 8. **Spacer**
> Add breathing room

**Configuration:**
- **Size**: Medium

---

### 9. **Columns** - Quick Info
> Mass times, office hours, location

**Configuration:**
- **Title**: "Essential Information"
- **Number of Columns**: 3
- **Columns**:

  **Column 1: Mass Times**
  - Title: "Mass Schedule"
  - Content:
    ```
    **Weekend**
    Saturday: 5:00 PM
    Sunday: 8:00 AM, 10:00 AM, 12:00 PM

    **Daily**
    Monday-Friday: 9:00 AM
    ```
  - Icon: Calendar (optional)
  - Link: "Full Schedule" → `/mass-times`

  **Column 2: Office Hours**
  - Title: "Parish Office"
  - Content:
    ```
    **Hours**
    Monday-Friday
    9:00 AM - 5:00 PM

    **Contact**
    Phone: (555) 123-4567
    Email: office@sthelen.org
    ```
  - Icon: Building (optional)
  - Link: "Contact Us" → `/contact`

  **Column 3: Location**
  - Title: "Find Us"
  - Content:
    ```
    123 Church Street
    City, State 12345

    We're located in the heart of downtown, just off Main Street.
    ```
  - Icon: Map Pin (optional)
  - Link: "Get Directions" → `/visit#directions`

---

### 10. **PostList** - Latest from the Pastor
> Blog posts or articles

**Configuration:**
- **Title**: "From the Pastor's Desk"
- **Subtitle**: "Latest reflections and updates"
- **Category Filter**: (select "Pastor's Column" if you have that category)
- **Limit**: 3
- **Layout**: Featured
- **Show Excerpt**: Yes
- **Show Author**: Yes
- **Show Date**: Yes
- **Show View All Link**: Yes
- **View All URL**: `/posts`
- **Appearance**: Background = Light

---

### 11. **BulletinList** - Weekly Bulletin
> Easy access to bulletins

**Configuration:**
- **Title**: "Weekly Bulletin"
- **Subtitle**: "Download this week's bulletin"
- **Display Mode**: Current
- **Limit**: 1
- **Layout**: Grid
- **Show Highlights**: Yes
- **Show View All Link**: Yes
- **View All URL**: `/bulletins`
- **Appearance**: Background = Surface

---

### 12. **CTAFullWidth** - Give or Join
> Strong call to action

**Configuration:**
- **Title**: "Support Our Mission"
- **Description**: "Your generosity helps us serve our community, support our ministries, and maintain our beautiful church home."
- **Primary Button**:
  - Label: "Give Online"
  - URL: `/give`
- **Secondary Button**:
  - Label: "Learn About Giving"
  - URL: `/give/about`
- **Background Image**: Upload an inspiring image
- **Overlay**: Medium
- **Appearance**: Full Width, Large Padding

---

## After Setting Up

1. **Preview** - Use the preview button to see how your homepage looks
2. **Publish** - Click "Publish" to make your homepage live
3. **Test** - Visit `http://localhost:3000/` to see your homepage

## Tips

- **Order Matters**: Drag blocks to reorder them in the page editor
- **Appearance Settings**: Each block has appearance settings for background color, alignment, and padding
- **Content First**: Focus on adding great content before worrying about styling
- **Mobile Check**: Preview on mobile devices to ensure responsiveness

## Need Help?

The "What are you looking for?" assistant widget is now active on your site! It will help visitors find what they need quickly.

---

## Next Steps

1. **Populate Collections**: Add events, posts, bulletins, ministries, and LifeLines
2. **Global Settings**: Fill in your parish information in Global Settings
3. **Navigation**: Configure header and footer navigation
4. **Pages**: Create additional pages (About, Ministries, Events, Contact, etc.)
5. **Media**: Upload photos and images to the Media collection

Your Saint Helen website is ready to serve your community!
