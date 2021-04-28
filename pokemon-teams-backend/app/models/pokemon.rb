class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :pokemon_limit

  private

  def pokemon_limit
    errors.add :failure, "A trainer cannot have more than 6 Pokemon" if trainer.pokemons.count >= 6
  end

end
