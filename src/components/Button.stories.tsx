// Button.stories.js
import React, { useState } from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text'],
      description: 'The button variant',
      defaultValue: 'contained',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error'],
      description: 'The button color',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: 'The button size',
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button take full width',
      defaultValue: false,
    },
    onClick: { action: 'clicked' },
    children: {
      control: 'text',
      description: 'Button label text',
      defaultValue: 'Button Text',
    },
  },
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
};

// Template for creating stories
const Template = (args) => <Button {...args} />;

// Base story
export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  onClick: () => alert('Button clicked!'),
};

// Variants
export const Contained = () => (
  <div className="flex space-x-4">
    <Button variant="contained" color="primary" onClick={() => console.log('Primary clicked')}>Primary</Button>
    <Button variant="contained" color="secondary" onClick={() => console.log('Secondary clicked')}>Secondary</Button>
    <Button variant="contained" color="success" onClick={() => console.log('Success clicked')}>Success</Button>
    <Button variant="contained" color="error" onClick={() => console.log('Error clicked')}>Error</Button>
  </div>
);

export const Outlined = () => (
  <div className="flex space-x-4">
    <Button variant="outlined" color="primary" onClick={() => console.log('Primary outlined clicked')}>Primary</Button>
    <Button variant="outlined" color="secondary" onClick={() => console.log('Secondary outlined clicked')}>Secondary</Button>
    <Button variant="outlined" color="success" onClick={() => console.log('Success outlined clicked')}>Success</Button>
    <Button variant="outlined" color="error" onClick={() => console.log('Error outlined clicked')}>Error</Button>
  </div>
);

export const Text = () => (
  <div className="flex space-x-4">
    <Button variant="text" color="primary" onClick={() => console.log('Primary text clicked')}>Primary</Button>
    <Button variant="text" color="secondary" onClick={() => console.log('Secondary text clicked')}>Secondary</Button>
    <Button variant="text" color="success" onClick={() => console.log('Success text clicked')}>Success</Button>
    <Button variant="text" color="error" onClick={() => console.log('Error text clicked')}>Error</Button>
  </div>
);

// Sizes
export const Sizes = () => (
  <div className="flex items-center space-x-4">
    <Button size="small" onClick={() => console.log('Small clicked')}>Small</Button>
    <Button size="medium" onClick={() => console.log('Medium clicked')}>Medium</Button>
    <Button size="large" onClick={() => console.log('Large clicked')}>Large</Button>
  </div>
);

// With icons
export const WithIcons = () => (
  <div className="space-y-4">
    <div className="flex space-x-4">
      <Button //startIcon={<Search size={16} />} 
      onClick={() => console.log('Search clicked')}>Search</Button>
      <Button //startIcon={<Download size={16} />} 
      onClick={() => console.log('Download clicked')}>Download</Button>
      <Button //endIcon={<ArrowRight size={16} />} 
      onClick={() => console.log('Next clicked')}>Next</Button>
      <Button //endIcon={<Send size={16} />} 
      onClick={() => console.log('Send clicked')}>Send</Button>
    </div>
    <div className="flex space-x-4">
      <Button variant="outlined" //startIcon={<PlusCircle size={16} />} 
      onClick={() => console.log('Add clicked')}>Add Item</Button>
      <Button variant="outlined" //endIcon={<Heart size={16} />} 
      onClick={() => console.log('Favorite clicked')}>Favorite</Button>
      <Button variant="text" //startIcon={<Trash size={16} />} 
      color="error" onClick={() => console.log('Delete clicked')}>Delete</Button>
    </div>
  </div>
);

// States
export const States = () => (
  <div className="space-y-4">
    <div className="flex space-x-4">
      <Button disabled onClick={() => console.log('Should not be logged')}>Disabled</Button>
      <Button variant="outlined" disabled onClick={() => console.log('Should not be logged')}>Disabled Outlined</Button>
      <Button variant="text" disabled onClick={() => console.log('Should not be logged')}>Disabled Text</Button>
    </div>
    <div>
      <Button fullWidth onClick={() => console.log('Full width clicked')}>Full Width Button</Button>
    </div>
  </div>
);

// Interactive example with onClick
export const Interactive = Template.bind({});
Interactive.args = {
  children: 'Interactive Button',
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  disabled: false,
  fullWidth: false,
  onClick: () => alert('Interactive button clicked!'),
};

// Counter example with state
export const ClickCounter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-100 rounded-md">
        <p className="text-lg font-medium mb-2">Counter: {count}</p>
        <div className="flex space-x-2">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setCount(count + 1)}
            //startIcon={<ThumbsUp size={16} />}
            >
            Increment
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

// Event logger
export const EventLogger = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  const logEvent = (event) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs([`${timestamp}: ${event}`, ...logs.slice(0, 4)]);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => logEvent('Primary button clicked')}>
          Log Primary
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => logEvent('Secondary button clicked')}>
          Log Secondary
        </Button>
        <Button 
          variant="text" 
          color="success" 
          onClick={() => logEvent('Success button clicked')}>
          Log Success
        </Button>
      </div>
      
      <div className="p-4 bg-gray-100 rounded-md">
        <h3 className="font-medium mb-2">Event Log:</h3>
        {logs.length > 0 ? (
          <ul className="space-y-1">
            {logs.map((log, index) => (
              <li key={index} className="text-sm font-mono">{log}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No events logged yet. Click a button to see events.</p>
        )}
      </div>
    </div>
  );
};