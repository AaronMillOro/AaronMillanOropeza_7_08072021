<template>
  <form>
    <div class="form-group row p-3">
      <input type="text" class="form-control col-sm-5" placeholder="Utilisateur" aria-label="Utilisateur" aria-describedby="email">
      <span class="input-group-text col-sm-7" id="email">@groupomania.com</span>
    </div>

    <div class="form-group row">
      <label for="password" class="col-sm-4 col-form-label">Mot de passe</label>
      <div class="col-sm-8">
        <input type="password" class="form-control" id="password" placeholder="Mot secret">
      </div>
    </div>

    <div class="form-group row">
      <div class="col-sm-12">
        <button type="submit" :class=classButton>{{ text }}</button>
      </div>
    </div>
  </form>
</template>>

<script>
export default {
  name: 'SignForm',
  props: {
    color: String, 
    text: String
  },
  computed: {
    classButton: function() {
      return "btn btn-outline-" + this.color + " btn-lg btn-block"
    }
  }
}
</script>