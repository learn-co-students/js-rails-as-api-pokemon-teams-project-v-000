class PokemonSerializer

  def initialize(pokemon_object)

    @pokemon = pokemon_object

  end

  def to_serialized_json

    # Commented code accomplishes same function as active code below:

    # @pokemon.to_json(:include => {
    #   :trainer => {:only => [:id, :name]}
    # }, :except => [:updated_at, :created_at])

    options = {
      include: {
        trainer: {
          only: [:id, :name]
        }
      },
      except: [:updated_at, :created_at],
    }
    @pokemon.to_json(options)

  end

end
