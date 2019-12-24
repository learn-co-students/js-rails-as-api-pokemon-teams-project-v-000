class Pokemon < ApplicationRecord
  belongs_to :trainer

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    options = {
      include: [:trainer]
    }
    render json: PokemonSerializer.new(pokemon, options)
  end

end
