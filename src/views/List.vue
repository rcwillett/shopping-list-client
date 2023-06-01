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
    <div class="row justify-content-center" v-if="loading && !error">
        <div class="col-12 text-center">
            <Loader />
        </div>
    </div>
    <div v-else-if="!loading && !error" class="row">
        <div class="col-12 col-md-8 col-lg-6 mx-auto">
            <div class="row">
                <div class="col-12">
                    <h2 class="my-3 text-center">Grocery List</h2>
                    <div v-if="groceryList.length > 0">
                        <Item v-for="item in groceryList" :key="item.id" v-bind="item" :removeItem="removeItem" :updateItem="updateItem"></Item>
                    </div>
                    <div v-else>
                        <div class="col-12">
                            <h5 class="text-center">No items in your grocery list. Add an item to get started!</h5>
                        </div>
                    </div>
                </div>
                <div class="col-12" v-if="!addingItem">
                    <button class="btn-block btn btn-primary" @click="toggleAddItem">Add New Item</button>
                </div>
                <div v-else class="col-12">
                    <div class="row align-items-end">
                        <div class="col-12 mt-3 mb-2">
                            <h5 class="text-center">New Item</h5>
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label">Name</label>
                            <input class="form-control" v-model="itemName" />
                        </div>
                        <div class="col-12 col-md-3">
                            <label class="form-label">Quantity</label>
                            <input class="form-control" v-model="itemQuantity" type="number" />
                        </div>
                        <div class="col ml-auto my-1">
                            <button class="btn-block btn btn-primary" @click="createItem(itemName, itemQuantity)">Create</button>
                        </div>
                        <div class="col-12 my-1">
                            <button class="btn-block btn btn-secondary" @click="toggleAddItem">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>