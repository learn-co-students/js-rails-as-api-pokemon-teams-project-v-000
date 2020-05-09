class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end 

    def create
        #trainer = Trainer.find(params[:trainer_id])
#
        #pokemon = trainer.build({
        #    nickname: Faker::Name.first_name, 
        #    species: Faker::Games::Pokemon.name})
        #pokemon.save

        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: pokemon
    end 

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy

    end 

end
