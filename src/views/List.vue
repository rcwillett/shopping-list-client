<script>
import { list } from '../services';
import Item from '../components/Item.vue';
import Loader from '../components/Loader.vue';

export default {
    data() {
        return {
            groceryList: [],
            loading: true,
            error: false,
            addingItem: false,
            itemName: '',
            itemQuantity: 1,
        };
    },
    async mounted() {
        try {
            const response = await list.getList();
            this.groceryList = response.data;
            this.loading = false;
        } catch (error) {
            this.error = true;
        }
    },
    methods: {
        async removeItem(itemId) {
            try {
                this.loading = true;
                await list.removeItem(itemId);
                const response = await list.getList();
                this.groceryList = response.data;
                this.loading = false;
            } catch (error) {
                this.error = true;
            }
        },
        async updateItem(itemId, name, quantity) {
            try {
                this.loading = true;
                await list.updateItem(itemId, name, quantity);
                const response = await list.getList();
                this.groceryList = response.data;
                this.loading = false;
            } catch (error) {
                this.error = true;
            }
        },
        async createItem(name, quantity) {
            try {
                this.loading = true;
                await list.createItem(name, quantity);
                const response = await list.getList();
                this.itemName = '';
                this.itemQuantity = 1;
                this.groceryList = response.data;
                this.addingItem = false;
                this.loading = false;
            } catch (error) {
                this.error = true;
            }
        },
        toggleAddItem () {
            this.addingItem = !this.addingItem;
        },
    },
    components: {
        Item,
        Loader,
    },
}
</script>

<template>
    <div v-if="error">
        <h1 class="text-center error">Unexpected Error, Please Reload The Page</h1>
    </div>
    <div v-if="loading && !error">
        <Loader />
    </div>
    <div v-else-if="!loading && !error">
        <h2>Grocery List</h2>
        <div v-if="groceryList.length > 0">
            <Item v-for="item in groceryList" :key="item.id" v-bind="item" :removeItem="removeItem" :updateItem="updateItem"></Item>
        </div>
        <div v-else>
            <h5 class="text-center">No items in your grocery list. Add an item to get started!</h5>
        </div>
    </div>
    <div v-if="!addingItem">
        <button class="btn btn-primary" @click="toggleAddItem">Add New Item</button>
    </div>
    <div v-else class="row">
        <div class="col-12 col-md-6">
            <input class="form-control" v-model="itemName" />
        </div>
        <div class="col-12 col-md-3">
            <input class="form-control" v-model="itemQuantity" type="number" />
        </div>
        <div class="col">
            <button class="btn btn-primary" @click="createItem(itemName, itemQuantity)">Create</button>
        </div>
        <div class="col">
            <button class="btn btn-secondary" @click="toggleAddItem">Cancel</button>
        </div>
    </div>
</template>