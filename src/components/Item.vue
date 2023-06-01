<script>
export default {
    props: ['name', 'quantity', 'id', 'purchased', 'removeItem', 'updateItem', 'markPurchased'],
    data() {
        return {
            isEditing: false,
            editName: this.name,
            editQuantity: this.quantity,
        };
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing;
        },
    }
}
</script>

<template>
    <div v-if="!isEditing || purchased" class="row my-1 item-view">
        <div class="item-name col-12 col-md-4" :class="{strike: purchased}">
            {{ name }}
        </div>
        <div class="item-quantity col-12 col-md-2" :class="{strike: purchased}">
            {{ quantity }}
        </div>
        <div v-if="!purchased" class="col">
            <button class="purchased-btn btn btn-success" @click="markPurchased(id)">Purchased</button>
        </div>
        <div v-if="!purchased" class="col">
            <button class="edit-btn btn btn-primary" @click="$event => toggleEdit()">Edit</button>
        </div>
        <div class="col">
            <button class="remove-btn btn btn-secondary" @click="removeItem(id)">Remove</button>
        </div>
    </div>
    <div v-else-if="!purchased" class="row my-1 align-items-end item-edit">
        <div class="col-12 col-md-4">
            <label class="form-label">Name</label>
            <input class="form-control name-field" v-model="editName" />
        </div>
        <div class="col-12 col-md-3">
            <label class="form-label">Quantity</label>
            <input class="form-control quantity-field" v-model="editQuantity" type="number" />
        </div>
        <div class="col">
            <button class="btn btn-primary update-btn" @click="updateItem(id, editName, editQuantity)">Update</button>
        </div>
        <div class="col">
            <button class="btn btn-secondary cancel-btn" @click="toggleEdit()">Cancel</button>
        </div>
    </div>
</template>

<style>
    .strike {
        text-decoration: line-through;
    }
</style>