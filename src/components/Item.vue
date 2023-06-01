<script>
export default {
    props: ['name', 'quantity', 'id', 'removeItem', 'updateItem'],
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
    <div v-if="!isEditing" class="row">
        <div class="col-12 col-md-4">
            {{ name }}
        </div>
        <div class="col-12 col-md-2">
            {{ quantity }}
        </div>
        <div class="col">
            <button class="btn btn-primary" @click="$event => toggleEdit()">Edit</button>
        </div>
        <div class="col">
            <button class="btn btn-secondary" @click="removeItem(id)">Remove</button>
        </div>
    </div>
    <div v-else class="row">
        <div class="col-12 col-md-6">
            <input class="form-control" v-model="editName" />
        </div>
        <div class="col-12 col-md-3">
            <input class="form-control" v-model="editQuantity" type="number" />
        </div>
        <div class="col">
            <button class="btn btn-primary" @click="updateItem(id, editName, editQuantity)">Update</button>
        </div>
        <div class="col">
            <button class="btn btn-secondary" @click="toggleEdit()">Cancel</button>
        </div>
    </div>
</template>