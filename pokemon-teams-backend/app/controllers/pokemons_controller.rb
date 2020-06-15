class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.new(:trainer_id => params['pokemon']['trainer_id'], :nickname => name, :species => species)
        if (pokemon.save)
            render json: pokemon, only: [:id, :nickname, :species, :trainer_id]
        end
    end

    def destroy
        pokemon = Pokemon.find_by(:id => params[:id])
        if pokemon.present?
            Pokemon.destroy(pokemon.id)
            head :no_content
        end
    end

end
