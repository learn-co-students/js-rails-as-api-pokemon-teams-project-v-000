class PokemonSerializer
  def initialize(pokemon_object)
    @pokemon = pokemon_object
  end

  def to_serialized_json
    information = {
      include: {
        trainer: {
          only: [:id, :name]
        }
      },
      except: [:created_at, :updated_at]
    }
    @pokemon.to_json(information)
  end
end
