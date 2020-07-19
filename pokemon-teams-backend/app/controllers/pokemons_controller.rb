class PokemonsController < ApplicationController
    def create
        # binding.pry
        trainer = Trainer.find_by_id(params[:trainer_id])
        pokemon = trainer.pokemons.build(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)

        render json: pokemon.save ? pokemon : {message: pokemon.errors.messages[:team_max][0]}
    end

    def destroy
        # binding.pry
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.destroy
    end
end