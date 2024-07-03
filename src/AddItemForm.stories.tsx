import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {Button} from "./stories/Button";
// import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'AddItemForm',
    component: AddItemForm,
    // ...
};

// type Story = StoryObj<typeof meta>;
export default meta;

export const AddItemFormTest = (props: any) => {
    return <AddItemForm addItem={ (value) => {alert(value);} }/>
};
//
// export const Warning: Story = {
//     args: {
//         primary: true,
//         label: 'Delete now',
//         backgroundColor: 'red',
//     }
// };





/*
const meta: Meta<typeof Button> = {
    title: 'AddItemForm',
    component: Button,
    // ...
};

// type Story = StoryObj<Button>;
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Click',
        //background: 'red'
    }
};

export const Warning: Story = {
    args: {
        primary: true,
        label: 'Delete now',
        backgroundColor: 'red',
    }
};
*/