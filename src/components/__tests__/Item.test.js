import { mount } from '@vue/test-utils'
import Item from '../Item.vue'

describe('Item Component Tests', () => {
    let wrapper;

    test('Mount component', () => {
        expect(Item).toBeTruthy();
        wrapper = mount(Item, {
            props: {
                id: 1,
                name: 'test',
                quantity: 1,
                purchased: false,
            }
        });
    });

    test('Ensure initial state is correct', () => {
        expect(wrapper.find('.item-view').exists()).toBeTruthy();
        expect(wrapper.find('.item-edit').exists()).toBe(false);
        expect(wrapper.find('.item-name').text()).toBe('test');
        expect(wrapper.find('.item-quantity').text()).toBe('1');
        expect(wrapper.find('.strike').exists()).toBe(false);
    });

    test('Ensure edit click toggles state', async () => {
        await wrapper.get('.edit-btn').trigger('click');
        expect(wrapper.find('.item-view').exists()).toBe(false);
        expect(wrapper.find('.item-edit').exists()).toBeTruthy();
    });

    test('Ensure typing in fields updates state properly', async () => {
        wrapper.get('.name-field').setValue('new');
        wrapper.get('.quantity-field').setValue(2);
        expect(wrapper.vm.editName).toBe('new');
        expect(wrapper.vm.editQuantity).toBe(2);
    });

    test('Ensure cancel click toggles state', async () => {
        await wrapper.get('.cancel-btn').trigger('click');
        expect(wrapper.find('.item-view').exists()).toBeTruthy();
        expect(wrapper.find('.item-edit').exists()).toBe(false);
    });

    test('Ensure purchased click toggles state', async () => {
        await wrapper.setProps({
            ...wrapper.props(),
            markPurchased: () => {
                wrapper.setProps({
                    purchased: true,
                });
            }
        });
        await wrapper.get('.purchased-btn').trigger('click');
        expect(wrapper.find('.item-view').exists()).toBeTruthy();
        expect(wrapper.find('.item-edit').exists()).toBe(false);
        expect(wrapper.find('.strike').exists()).toBeTruthy();
    });
});