class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons, except: [:created_at, :updated_at]   #=> This works just fine & matches what we're aiming for.
    # render json: pokemons, only: [:species, :nickname]        #=> This works just fine
    # render json: pokemons, include: [:species, :nickname]     #=> This does not work at all for some reason
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    if pokemon
      render json: pokemon.to_json(:include => {:trainer => {:only => [:name]}})
    else
      render json: { message: 'No sighting found with that id' }
    end
  end

# https://learn.co/tracks/full-stack-web-development-v8/module-14-front-end-web-programming-in-javascript/section-6-rails-as-an-api/pokemon-teams-project
# Note: When adding a new pokemon, the nickname should be generated using the
# Faker::Name gem and the species should be generated using the Faker::Games::Pokemon gem.
# See the seeds.rb file above as an example.

  def create
    trainer = Trainer.find(params[:trainer_id])
    if(trainer.pokemons.length < 6)
      pokemonData = {
        nickname: Faker::Name.first_name,
        species: Faker::Games::Pokemon.name
      }
      pokemon = trainer.pokemons.create(pokemonData)
      render json: pokemon
    else
      render json: {status: 'error', message: "This trainer already has six pokemon"}
      # render json: { message: "This trainer already has six pokemon." }
      # render(
      #   html: "<script>alert('This trainer already has six pokemon')</script>".html_safe,
      #   layout: 'application'
      # )
      # format.js { render :json => "This trainer already has six pokemon", :status => 400 }
      # format.html { render :json => "This trainer already has 6 pokemon" , :status => 400 }
    end
  end

  def update
    render json:  { message: "The Backend admins don't want you to do this because it violates core program logic!"}
  end

  def destroy
    pokemon = Pokemon.find_by(:id => params[:id])
    if pokemon.present?
        Pokemon.destroy(pokemon.id)
        head :no_content
    end
  end
end
