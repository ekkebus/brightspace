This project offers WebComponets that will add learner interaction to static HTML pages in a Electronic learning environment.

# Brightspace WebComponents

This README documents the usage of custom WebComponents for Brightspace.

## Table of Contents
1. [brightspace-accordion](#brightspace-accordion)
2. [brightspace-flipcard](#brightspace-flipcard)
3. [brightspace-matchgame](#brightspace-matchgame)

## Installation

To use these components, include the following script tag in your HTML file:

```html
<script defer type="module" src="https://ekkebus.github.io/brightspace/components.js"></script>
```

## Components

### brightspace-accordion

An accordion component that displays a group of expandable elements.

#### Usage

```html
<brightspace-accordion data-content='{ ... }'>
</brightspace-accordion>
```

#### Attributes

- `data-content`: A JSON string containing the accordion configuration.

  - `groupName`: The name of the accordion group.
  - `elements`: An array of objects, each representing an accordion item:
    - `name`: Unique identifier for the item.
    - `label`: Display label for the item.
    - `content`: HTML content or special content (e.g., YouTube video).

#### Example

```html
<brightspace-accordion
  data-content='{ 
    "groupName": "accountabilities", 
    "elements": [
      { 
        "name": "ProductOwner", 
        "label": "👨‍💻 Product Owner", 
        "content": "youtube=PbgGTwUwvQE" 
      },
      { 
        "name": "Developers", 
        "label": "👷👷🏽‍♀️ Developers", 
        "content": "De inhoud van deze video wijkt af van de meest recente versie van de Scrum Guide.<br>youtube=6lix96d5RuI" 
      },
      { 
        "name": "ScrumMaster", 
        "label": "👩🏻‍🏫 Scrum Master", 
        "content": "youtube=mibskQFloTM" 
      }
    ] 
  }'
>
</brightspace-accordion>
```

### brightspace-flipcard

A component that displays a set of cards with front and back content.

#### Usage

```html
<brightspace-flipcard data-content='{ ... }'>
</brightspace-flipcard>
```

#### Attributes

- `data-content`: A JSON string containing the flipcard configuration.

  - `cards`: An array of objects, each representing a card:
    - `front`: HTML content for the front of the card.
    - `back`: HTML content for the back of the card.

#### Example

```html
<brightspace-flipcard
  data-content='{ 
    "cards": [
      { 
        "front": "📇<br>De Sprint Backlog", 
        "back": "De Sprint Backlog geeft transparantie over de voortgang van de Developers t.o.v. het Sprint Doel." 
      },
      { 
        "front": "👩🏻‍⚕️<br>De Sprint Retrospective", 
        "back": "De Retrospective geeft transparantie over hoe hoe het Scrum Team samenwerkt. Transparantie is het startpunt van openheid." 
      },
      { 
        "front": "✅<br>De Definition of Done", 
        "back": "De Definition of Done geeft transparantie wanneer het Scrum team een Product Backlog Item done is." 
      }
    ] 
  }'
>
</brightspace-flipcard>
```

### brightspace-matchgame

A component that creates a matching game with pairs of items.

#### Usage

```html
<brightspace-matchgame data-content='{ ... }'>
  Fallback content
</brightspace-matchgame>
```

#### Attributes

- `data-content`: A JSON string containing the matchgame configuration.

  - `pairs`: An array of objects, each representing a pair to match:
    - `left`: Content for the left side of the pair.
    - `right`: Content for the right side of the pair.

#### Example

```html
<brightspace-matchgame
  data-content='{
    "pairs":[
      {"left": "🏆 Product Goal", "right": "🗂️ Product Backlog"},
      {"left": "⛳ Sprint Goal", "right": "📇 Sprint Backlog"},
      {"left": "✅ Definition of Done", "right": "🎁 Increment"}
    ]
  }'
>
  Brightspace matchgame webcomponent (github.com/ekkebus/brightspace)
</brightspace-matchgame>
```

Note: The content between the opening and closing tags serves as fallback content or additional information about the component. 
In case it is displayed, read the [Installation](#Installation) section first.