class PokemonsController < ApplicationController

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

  def create
    trainer = Trainer.find(params[:trainer_id].to_i)
    # byebug  
    # trainer = Trainer.find_by(:id => params[:pokemons][:trainer_id])
    #if trainer has more than 6 pokemon
    if trainer.pokemons.size >= 6 
      render json: { message: "Team is full" }
    else 
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(:nickname => name, :species => species, :trainer_id => trainer.id)
    #   render json: PokemonSerializer.new(pokemon).to_serialized_json
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    if pokemon
      pokemon.destroy
    #   render json: PokemonSerializer.new(pokemon).to_serialized_json
    else
      render json: { message: "Pokemon not found" }
    end
end 

end
