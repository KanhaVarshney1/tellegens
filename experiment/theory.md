Tellegen's Theorem
Introduction
Tellegen's Theorem is a fundamental principle in electrical network theory, applicable to any lumped network that contains elements like resistors, capacitors, inductors, and sources. It is a general theorem that relates the voltages and currents in a network, providing a powerful tool for analyzing electrical circuits.
Statement of Tellegen's Theorem
Tellegen's Theorem states that for any lumped electrical network that obeys Kirchhoff's Current Law (KCL) and Kirchhoff's Voltage Law (KVL), the sum of the power consumed by all elements in the network is zero. Mathematically, for a network with ( b ) branches, if ( v_k ) is the voltage across the ( k )-th branch and ( i_k ) is the current through the ( k )-th branch (with consistent reference directions), then:
[\sum_{k=1}^b v_k i_k = 0]
This implies that the total power delivered by the sources equals the total power consumed by the loads in the network.
Key Assumptions

Lumped Network: The network is composed of discrete elements (resistors, capacitors, inductors, etc.) connected by ideal wires.
Kirchhoff's Laws: The network obeys KCL (sum of currents entering a node is zero) and KVL (sum of voltages around a closed loop is zero).
Consistent Reference Directions: The voltage and current directions must follow the passive sign convention, where positive power indicates power absorbed by an element.

Derivation
Tellegen's Theorem can be derived using Kirchhoff's laws. Consider a network with ( n ) nodes and ( b ) branches:

Assign Voltages and Currents: For each branch ( k ), assign a voltage ( v_k ) and a current ( i_k ).
Kirchhoff's Current Law (KCL): At each node, the sum of currents leaving the node is zero. This can be represented using an incidence matrix ( A ), where the current vector ( \mathbf{i} ) satisfies ( A \mathbf{i} = 0 ).
Kirchhoff's Voltage Law (KVL): The voltages across the branches can be expressed in terms of node potentials ( \mathbf{e} ), such that ( \mathbf{v} = A^T \mathbf{e} ).
Power Summation: The total power is given by the sum of the products of branch voltages and currents:[\sum_{k=1}^b v_k i_k = \mathbf{v}^T \mathbf{i} = (A^T \mathbf{e})^T \mathbf{i} = \mathbf{e}^T A \mathbf{i}]
Apply KCL: Since ( A \mathbf{i} = 0 ) (from KCL), it follows that:[\mathbf{e}^T A \mathbf{i} = 0]Thus:[\sum_{k=1}^b v_k i_k = 0]

This result shows that the sum of the powers in all branches is zero, confirming Tellegen's Theorem.
Physical Interpretation
Tellegen's Theorem reflects the principle of conservation of energy in electrical networks. The theorem states that the power supplied by sources (e.g., voltage or current sources) is exactly equal to the power dissipated or stored in the network elements (e.g., resistors, capacitors, inductors). This balance holds regardless of the specific nature of the elements (linear, nonlinear, time-varying, or time-invariant).
Applications
Tellegen's Theorem has several important applications in circuit analysis:

Verification of Circuit Solutions: It can be used to check the consistency of calculated voltages and currents in a circuit.
Network Sensitivity Analysis: The theorem is used in sensitivity analysis to determine how changes in one part of a circuit affect the overall behavior.
Nonlinear and Time-Varying Circuits: Since the theorem does not depend on the linearity of elements, it is applicable to complex circuits with nonlinear or time-varying components.
Power Flow Analysis: It is used in power systems to ensure that the power injected into the system equals the power consumed or lost.

Example
Consider a simple circuit with a voltage source, a resistor, and an inductor connected in series:

Let the voltage source provide ( v_1 = 10 , \text{V} ) with current ( i_1 = 2 , \text{A} ).
The resistor has a voltage drop ( v_2 = 4 , \text{V} ) and current ( i_2 = 2 , \text{A} ).
The inductor has a voltage drop ( v_3 = 6 , \text{V} ) and current ( i_3 = 2 , \text{A} ).

Using Tellegen's Theorem:[v_1 i_1 + v_2 i_2 + v_3 i_3 = (10 \cdot 2) + (4 \cdot 2) + (6 \cdot 2) = 20 + 8 + 12 = 40]However, if we consider the reference directions (e.g., the source delivers power, so ( v_1 i_1 ) is negative):[v_1 i_1 + v_2 i_2 + v_3 i_3 = (-10 \cdot 2) + (4 \cdot 2) + (6 \cdot 2) = -20 + 8 + 12 = 0]This satisfies Tellegen's Theorem, confirming that the power delivered by the source equals the power absorbed by the resistor and inductor.
Generalization
Tellegen's Theorem can be extended to dynamic networks, where voltages and currents are time-varying, and to networks with distributed elements under certain conditions. It also forms the basis for more advanced network theorems and computational techniques in circuit analysis.
Conclusion
Tellegen's Theorem is a versatile and powerful tool in electrical engineering, providing a universal relationship between voltages and currents in a network. Its generality and independence from element characteristics make it applicable to a wide range of circuit analysis problems, from simple resistive circuits to complex, nonlinear systems.
