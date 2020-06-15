class CreateHawks < ActiveRecord::Migration[6.0]
  def change
    create_table :hawks do |t|
      t.string :name
      t.string :species

      t.timestamps
    end
  end
end
